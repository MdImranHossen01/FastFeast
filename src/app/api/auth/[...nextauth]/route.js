import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        const usersCollection = dbConnect(collectionsName.usersCollection);
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) throw new Error("Invalid email or password");
        if (!user.password) throw new Error("User registered with Google");

        //Check password only if skipOtp is NOT true
        if (!credentials.skipOtp) {
         const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");
        }


        // OTP required (first login )
        if (!credentials.skipOtp) {
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const hashedOtp = await bcrypt.hash(otp, 10);
          const otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

          await usersCollection.updateOne(
            { email: user.email },
            { $set: { otp: hashedOtp, otpExpires } }
          );

          await sendOtpEmail(user.email, otp);

          // Throw a special error to indicate OTP was sent
          throw new Error("OTP_REQUIRED");
        }

        // OTP verification logic
        if (credentials.skipOtp && credentials.otp) {
          if (!user.otp || !user.otpExpires) throw new Error("No OTP found, request again");
          if (user.otpExpires < new Date()) throw new Error("OTP expired");

          const isOtpValid = await bcrypt.compare(credentials.otp, user.otp);
          if (!isOtpValid) throw new Error("Invalid OTP");

          // Clear OTP after verification
          await usersCollection.updateOne(
            { email: user.email },
            { $unset: { otp: "", otpExpires: "" } }
          );
        }

        //Return login success
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.photoUrl,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
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
