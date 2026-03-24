import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luis Manuel Santos | Full Stack Developer",
  description:
    "Premium full stack portfolio built with Next.js, Tailwind CSS and next-intl.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
