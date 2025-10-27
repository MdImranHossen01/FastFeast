// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        skipOtp: { label: "Skip OTP", type: "boolean" },
      },
      async authorize(credentials) {
        try {
          const usersCollection = await dbConnect(collectionsName.usersCollection);
          const user = await usersCollection.findOne({ email: credentials.email });

          if (!user) throw new Error("Invalid email or password");
          if (!user.password && !credentials.skipOtp) throw new Error("User registered with Google/GitHub");

          // Check if this is a demo user
          const isDemoUser = user.isDemo === true;

          // Password check for non-demo users
          if (!credentials.skipOtp && !isDemoUser) {
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (!isMatch) throw new Error("Invalid email or password");
          }

          // Skip OTP for demo users
          if (isDemoUser) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              image: user.photoUrl,
              location: user.location,
              phone: user.phone,
              role: user.role,
              isDemo: true,
            };
          }

          // OTP for regular users
          if (!credentials.skipOtp) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedOtp = await bcrypt.hash(otp, 10);
            const otpExpires = new Date(Date.now() + 2 * 60 * 1000);

            await usersCollection.updateOne(
              { email: user.email },
              { $set: { otp: hashedOtp, otpExpires } }
            );

            await sendOtpEmail(user.email, otp);
            throw new Error("OTP_REQUIRED");
          }

          // OTP verification
          if (credentials.skipOtp && credentials.otp) {
            if (!user.otp || !user.otpExpires) throw new Error("No OTP found, request again");
            if (user.otpExpires < new Date()) throw new Error("OTP expired");

            const isOtpValid = await bcrypt.compare(credentials.otp, user.otp);
            if (!isOtpValid) throw new Error("Invalid OTP");

            await usersCollection.updateOne(
              { email: user.email },
              { $unset: { otp: "", otpExpires: "" } }
            );
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.photoUrl,
            location: user.location,
            phone: user.phone,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],

  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // When user signs in with Google/GitHub, create user if missing
    async signIn({ user, account, profile }) {
      try {
        const usersCollection = await dbConnect(collectionsName.usersCollection);
        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name || profile?.login || user.email.split('@')[0],
            email: user.email,
            photoUrl: user.image || profile?.avatar_url,
            provider: account.provider,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          // Update existing user with latest data
          await usersCollection.updateOne(
            { email: user.email },
            { 
              $set: { 
                name: user.name || existingUser.name,
                photoUrl: user.image || existingUser.photoUrl,
                updatedAt: new Date(),
              } 
            }
          );
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    // Refresh JWT with latest DB data every time session is accessed
    async jwt({ token, user, account, trigger, session }) {
      try {
        // If user just signed in
        if (user) {
          token.user = user;
        }

        // Always refresh user data from database
        const usersCollection = await dbConnect(collectionsName.usersCollection);
        const dbUser = await usersCollection.findOne({ email: token.email || token.user?.email });

        if (dbUser) {
          token.user = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.photoUrl,
            location: dbUser.location,
            phone: dbUser.phone,
            role: dbUser.role,
            isDemo: dbUser.isDemo || false,
          };
        }

        // If updating session via useSession().update()
        if (trigger === "update" && session) {
          token = { ...token, ...session };
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    // Serve fresh data in session
    async session({ session, token }) {
      try {
        if (token.user) {
          session.user = token.user;
          session.user.id = token.user.id;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },

    // Redirect after sign in
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: { 
    signIn: "/login",
    error: "/login",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };