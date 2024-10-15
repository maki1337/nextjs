import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Profile, Session, User, Account } from "next-auth";
import connectDB from "@/config/database";
import UserModel from "@/models/User";

interface GoogleProfile extends Profile {
  picture?: string;
}

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Correctly type the 'signIn' callback
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | null;
      account: Account | null;
      profile?: GoogleProfile;
    }) {
      if (profile) {
        await connectDB();
        const image = profile.image || profile.picture;

        const userExsists = await UserModel.findOne({ email: profile.email });

        if (!userExsists) {
          console.log("User does not exsist!");
          const username = profile.name?.slice(0, 20);
          await UserModel.create({
            email: profile.email,
            username,
            image: image,
          });

          console.log("User created!");
        }

        console.log("user already exsists!");
      }
      return true;
    },

    // Correctly type the 'session' callback
    async session({ session }: { session: Session }) {
      const user = await UserModel.findOne({
        email: session.user?.email,
      });

      if (user && session.user) {
        session.user.id = user._id.toString();
      }

      return session;
    },
  },
};
