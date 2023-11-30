import SpotifyProvider from "next-auth/providers/spotify";
import StravaProvider from "next-auth/providers/strava";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type Session,
} from "next-auth";

import { db } from "~/server/db";
import { env } from "~/env.mjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
    StravaProvider({
      clientId: env.STRAVA_CLIENT_ID,
      clientSecret: env.STRAVA_CLIENT_SECRET,
      authorization: {
        params: {
          scope: ["profile:read_all", "activity:read_all"].join(","),
        },
      },
    }),
  ],
  callbacks: {
    async jwt(args) {
      const { account, token } = args;
      console.log("jwt::", args);
      // Persist the OAuth access_token to the token right after sign in
      if (account) {
        const { access_token, expires_at, refresh_token } = account;
        return { ...token, refresh_token, expires_at, access_token };
      }

      return token;
    },
    // @ts-expect-error
    session: (args) => {
      console.log("session::", args);
      const { session, token, user } = args;
      return {
        // ...session,
        // accessToken: token?.access_token,
        // user: {  },
        user: {
          image: args.user.image,
          email: args.user.email,
          id: args.user.id,
        },
      };
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export function getServerAuthSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}
