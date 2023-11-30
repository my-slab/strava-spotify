import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "~/utils/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "stravastereo.fm",
  description: "Strava 🤝 Spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
