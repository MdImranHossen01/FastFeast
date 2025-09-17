import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect, collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

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
      },
      async authorize(credentials) {
        const usersCollection = dbConnect(collectionsName.usersCollection);
        const user = await usersCollection.findOne({ email: credentials.email });
        
        if (!user) throw new Error("Invalid email or password");
        if (!user.password) throw new Error("User registered with Google");
        
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");

        await usersCollection.updateOne(
          { email: user.email },
          { $set: { lastLogin: new Date() } }
        );

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          photoUrl: user.photoUrl,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const usersCollection = dbConnect(collectionsName.usersCollection);
        const existingUser = await usersCollection.findOne({ email: user.email });
        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            password: null,
            photoUrl: user.image,
            createdAt: new Date(),
            lastLogin: new Date(),
          });
        } else {
          await usersCollection.updateOne(
            { email: user.email },
            { $set: { lastLogin: new Date() } }
          );
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
