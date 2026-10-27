import "./globals.css";

// The <html> element lives in app/[locale]/layout.tsx so it can carry the page language.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
