// types/next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default Session type to include the user's ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` field to the user object
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
