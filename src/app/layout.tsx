import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartPark: Online Parking Marketplace",
  description: "Find your next parking spot with SmartPark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Script strategy="beforeInteractive">{`prefinery = window.prefinery || function() {(window.prefinery.q = window.prefinery.q || []).push(arguments)};`}</Script>
        <Script src="https://widget.prefinery.com/widget/v2/ctwzqz1c.js" strategy="afterInteractive" defer /> */}
        {children}
        <script> </script>
      </body>
    </html>
  );
}
