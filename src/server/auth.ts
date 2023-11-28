import SpotifyProvider from "next-auth/providers/spotify";
import StravaProvider from "next-auth/providers/strava";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";

import { db } from "~/server/db";
import { env } from "~/env.mjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

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
};
