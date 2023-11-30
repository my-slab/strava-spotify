"use client";

import { Button } from "react-aria-components";
import { signIn } from "next-auth/react";

import { ConnectWithStrava } from "./connect-with-strava";

export const SignIn = () => (
  <Button
    className="appearance-none outline-none ring-orange-500"
    aria-label="Connect with Strava"
    onPress={() => void signIn("strava", { callbackUrl: "/dashboard" })}
  >
    <ConnectWithStrava />
  </Button>
);
