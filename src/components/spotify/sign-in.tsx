"use client";

import { Button } from "react-aria-components";
import { signIn } from "next-auth/react";

import { ConnectWithSpotify } from "./connect-with-spotify";

export const SignIn = () => (
  <Button
    className="appearance-none outline-none ring-orange-500"
    aria-label="Connect with Strava"
    onPress={() => void signIn("spotify", { callbackUrl: "/dashboard" })}
  >
    <ConnectWithSpotify />
  </Button>
);
