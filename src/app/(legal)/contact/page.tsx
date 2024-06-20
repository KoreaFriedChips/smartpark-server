import type { Metadata } from 'next'
import React from "react";
import Link from "next/link";
import styles from "@/app/(legal)/legal.module.css";
import button from "@/app/page.module.css";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact SmartPark | Parking Marketplace",
  description: "Get in touch with SmartPark for account support, parking issues, data requests, bug reports, or business inquiries. We're here to help with all your parking marketplace needs.",
  keywords: "SmartPark, contact, support, parking app, customer service, technical support, feedback, bug report",
  authors: [{ name: "SmartPark Digital LLC" }],
  creator: "SmartPark Team",
  publisher: "SmartPark Digital LLC",
  openGraph: {
    title: "Contact SmartPark | Parking Marketplace",
    description: "Need help with SmartPark? Contact us for account support, parking issues, data requests, bug reports, or business inquiries. We're here to assist you with our innovative parking platform.",
    url: "https://www.trysmartpark.com/contact",
    siteName: "SmartPark",
    images: [
      {
        url: "https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp",
        alt: "SmartPark Contact Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SmartPark Support | Parking Marketplace",
    description: "Get support for SmartPark's parking marketplace. We're ready to help with account issues, parking problems, data requests, bug reports, and more.",
    images: ["https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp"],
    creator: "@SmartParkApp",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.trysmartpark.com/contact",
  },
  category: "Customer Support",
  classification: "Contact Information",
}

export const viewport = "width=device-width, initial-scale=1"

export default function Contact() {
  return (
    <>
      <h1 className={styles.title}>Contact SmartPark.</h1>
      <p className={styles.description}>
        We're here to help! Below are common scenarios where you might need to contact us. Feel free to reach out using the contact button at the
        bottom of this page, or at{" "}
        <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
          hello@trysmartpark.com
        </a>{" "}
        for any other inquiries, feedback, or questions.
      </p>

      <h2 className={styles.sectionTitle}>When to Contact Us:</h2>
      <ul className={styles.list}>
        <li className={styles.description}>Account issues or technical support</li>
        <li className={styles.description}>Reporting a problem with a parking space or transaction</li>
        <li className={styles.description}>Requesting data deletion or exercising your privacy rights</li>
        <li className={styles.description}>Reporting suspicious activity or policy violations</li>
        <li className={styles.description}>Providing feedback or reporting bugs</li>
        <li className={styles.description}>Business inquiries or partnership opportunities</li>
      </ul>
      <div className={styles.buttonContainer}>
        <a href="mailto:hello@trysmartpark.com" className={button.buttonMain} role="button">
          <Mail size={18} />
          <p>hello@trysmartpark.com</p>
        </a>
      </div>
    </>
  );
}
