import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import connectMongooseDb from "@/lib/mongoose";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    // --- Social Providers ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // --- Credentials Provider ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        skipOtp: { label: "Skip OTP", type: "boolean" },
      },

      async authorize(credentials) {
        await connectMongooseDb();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("Invalid email or password");
        if (!user.password)
          throw new Error("User registered with Google/GitHub");

        // Validate password
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) throw new Error("Invalid email or password");

        // Send OTP if user has not submitted one yet
        if (!credentials.skipOtp && !credentials.otp) {
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const hashedOtp = await bcrypt.hash(otp, 10);
          const otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 min

          await User.updateOne(
            { email: user.email },
            { $set: { otp: hashedOtp, otpExpires } }
          );

          await sendOtpEmail(user.email, otp);
          throw new Error("OTP_REQUIRED");
        }

        // Verify OTP
        if (credentials.skipOtp && credentials.otp) {
          if (!user.otp || !user.otpExpires)
            throw new Error("No OTP found, request again");

          if (user.otpExpires < new Date()) throw new Error("OTP expired");

          const isOtpValid = await bcrypt.compare(credentials.otp, user.otp);
          if (!isOtpValid) throw new Error("Invalid OTP");

          // Remove OTP after successful login
          await User.updateOne(
            { email: user.email },
            { $unset: { otp: "", otpExpires: "" } }
          );
        }

        // Return safe user data
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          location: user.location,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // Social sign-in (Google/GitHub)
    async signIn({ user, account, profile }) {
      await connectMongooseDb();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // Create new user
        await User.create({
          name: user.name || profile?.login,
          email: user.email,
          image: user.image,
          provider: account.provider,
        });
      } else {
        // Update existing user’s info
        await User.updateOne(
          { email: user.email },
          { $set: { image: user.image, provider: account.provider } }
        );
      }

      return true;
    },

    // Add user info to JWT
    async jwt({ token, user }) {
      await connectMongooseDb();

      const dbUser = await User.findOne({
        email: token?.user?.email || token?.email,
      });

      if (dbUser) {
        token.user = {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
          location: dbUser.location,
          phone: dbUser.phone,
          role: dbUser.role,
        };
      } else if (user) {
        token.user = user;
      }

      return token;
    },

    // Attach token to session
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
