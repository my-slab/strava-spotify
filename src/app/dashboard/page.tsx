import { redirect } from "next/navigation";
import { SignInWithSpotify } from "~/components";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function DashboardView() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  console.log("dashboard::", { session });

  const accounts = await db.account.findMany({
    where: {
      // @ts-expect-error
      userId: session.id,
      provider: "spotify",
    },
  });

  const isSpotifyConnected = accounts.length > 0;
  console.log({ isSpotifyConnected });

  return (
    <div>
      <h1>stravastereo 🎧</h1>
      {!isSpotifyConnected && <SignInWithSpotify />}
    </div>
  );
}
