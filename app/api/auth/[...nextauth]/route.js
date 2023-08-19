import User from "@models/User";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw error;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          console.log("Creating new user:", profile.email);
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        throw error;
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
