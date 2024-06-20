import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SmartPark: Parking Marketplace | Airbnb for Parking",
  description: "SmartPark revolutionizes parking. Find closer, safer, and cheaper parking for events or list your extra space for passive income. Easy, digital, and eco-friendly.",
  keywords: "SmartPark, parking app, affordable parking, event parking, driveway rental, passive income, parking marketplace, eco-friendly parking",
  authors: [{ name: "SmartPark Digital LLC" }],
  creator: "SmartPark Team",
  publisher: "SmartPark Digital LLC",
  openGraph: {
    title: "SmartPark: Parking Marketplace | Airbnb for Parking",
    description: "Discover affordable parking or earn from your extra space. SmartPark connects drivers with local parking spots for events, school, and more. Save time, money, and stress!",
    url: "https://www.trysmartpark.com",
    siteName: "SmartPark",
    images: [
      {
        url: "https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp",
        alt: "SmartPark: Find or List Parking Spaces",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartPark: Parking Marketplace | Airbnb for Parking",
    description: "Never struggle with parking again! SmartPark connects you to nearby, affordable parking spaces for events, school, and more. List your space and earn passive income.",
    images: ["https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp"],
    creator: "@SmartParkApp",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.trysmartpark.com",
  },
  category: "Transportation",
  classification: "Parking Solutions",
}

export const viewport = "width=device-width, initial-scale=1";

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
