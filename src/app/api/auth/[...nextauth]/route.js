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
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
        const usersCollection = await dbConnect(collectionsName.usersCollection);
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) throw new Error("Invalid email or password");
        if (!user.password) throw new Error("User registered with Google/GitHub");

        // Password check
        if (!credentials.skipOtp) {
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) throw new Error("Invalid email or password");
        }

        // OTP for login
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
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // When user signs in with Google/GitHub, create user if missing
    async signIn({ user, account, profile }) {
      const usersCollection = await dbConnect(collectionsName.usersCollection);
      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        await usersCollection.insertOne({
          name: user.name || profile?.login,
          email: user.email,
          photoUrl: user.image,
          provider: account.provider,
          createdAt: new Date(),
        });
      }
      return true;
    },

    // Refresh JWT with latest DB data every time session is accessed
    async jwt({ token, user }) {
      const usersCollection = await dbConnect(collectionsName.usersCollection);
      const dbUser = await usersCollection.findOne({ email: token?.user?.email });

      if (dbUser) {
        token.user = {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.photoUrl,
          location: dbUser.location,
          phone: dbUser.phone,
        };
      } else if (user) {
        // fallback for first login
        token.user = user;
      }

      return token;
    },

    // serve fresh data in session
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
