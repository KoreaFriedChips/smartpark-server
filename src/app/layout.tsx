import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "SmartPark: Revolutionize Your Parking Experience | Online Marketplace",
  description: "SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.",
  keywords: "SmartPark, online parking, parking marketplace, easy parking, book parking spots, parking solutions, convenient parking, parking app",
  authors: [{ name: "SmartPark LLC", url: "https://trysmartpark.com" }],
  openGraph: {
    title: "SmartPark: Revolutionize Your Parking Experience | Online Marketplace",
    description: "SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.",
    type: "website",
    url: "https://www.smartpark.com",
    images: ["/../public/SMARTPARK-DEMO-2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartPark: Revolutionize Your Parking Experience | Online Marketplace",
    description: "SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.",
    images: ["/../public/SMARTPARK-DEMO-2.png"],
  },
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
        {/* <Script strategy="beforeInteractive">{`prefinery = window.prefinery || function() {(window.prefinery.q = window.prefinery.q || []).push(arguments)};`}</Script>
        <Script src="https://widget.prefinery.com/widget/v2/ctwzqz1c.js" strategy="afterInteractive" defer /> */}
        {children}
        <script> </script>
      </body>
    </html>
  );
}
