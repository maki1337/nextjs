import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Profile, Session, User, Account } from "next-auth";

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
      profile?: Profile;
    }) {
      if (profile) {
        // Your sign-in logic with the correctly typed profile
        console.log(profile);
      }
      return true;
    },

    // Correctly type the 'session' callback
    async session({ session }: { session: Session }) {
      // Your session logic with the correctly typed session
      console.log(session);
      return session;
    },
  },
};
