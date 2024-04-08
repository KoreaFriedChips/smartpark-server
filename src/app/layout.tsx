import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "SmartPark: Online Parking Marketplace",
  description: "Find your next parking spot with SmartPark.",
};

const inter = Inter({
  subsets: ["latin"],
});

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <Script strategy="beforeInteractive">{`prefinery = window.prefinery || function() {(window.prefinery.q = window.prefinery.q || []).push(arguments)};`}</Script>
        <Script src="https://widget.prefinery.com/widget/v2/ctwzqz1c.js" strategy="afterInteractive" defer /> */}
        {children}
        <script> </script>
      </body>
    </html>
  );
}
