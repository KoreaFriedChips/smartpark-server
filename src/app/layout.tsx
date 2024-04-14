import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SmartPark: Online Parking Marketplace",
  description: "SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.",
  keywords: "SmartPark, online parking, parking marketplace, easy parking, book parking spots, parking solutions, convenient parking, parking app",
  authors: [{ name: "SmartPark LLC", url: "https://trysmartpark.com" }],
  openGraph: {
    title: "SmartPark: Online Parking Marketplace",
    description: "SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.",
    type: "website",
    url: "https://www.smartpark.com",
    images: ["/SMARTPARK-WAITLIST-ICON.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartPark: Online Parking Marketplace",
    description: "SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.",
    images: ["/SMARTPARK-DEMO-2.png"],
  },
};
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
        <script> </script>
        <Footer />
      </body>
      
    </html>
  );
}
