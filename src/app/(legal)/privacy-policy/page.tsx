import type { Metadata } from "next";
import React from "react";
import styles from "@/app/(legal)/legal.module.css";

export const metadata: Metadata = {
  title: "SmartPark Privacy Policy | Parking Marketplace",
  description:
    "Learn how SmartPark collects, uses, and protects your personal information. Our Privacy Policy outlines your rights and our data practices. Effective from 6/16/24.",
  keywords: "SmartPark, privacy policy, data protection, user privacy, parking app privacy, personal information, data rights",
  authors: [{ name: "SmartPark Digital LLC" }],
  creator: "SmartPark Team",
  publisher: "SmartPark Digital LLC",
  openGraph: {
    title: "SmartPark Privacy Policy | Protecting Your Data",
    description:
      "Understand how SmartPark safeguards your personal information. Learn about data collection, usage, sharing, and your privacy rights on our parking marketplace platform.",
    url: "https://www.trysmartpark.com/privacy-policy",
    siteName: "SmartPark",
    images: [
      {
        url: "https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp",
        alt: "SmartPark Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartPark Privacy Policy | Data Protection",
    description:
      "Discover how SmartPark protects your privacy. Review our data collection practices, user rights, and security measures for our innovative parking marketplace.",
    images: ["https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp"],
    creator: "@SmartParkApp",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.trysmartpark.com/privacy-policy",
  },
  category: "Legal",
  classification: "Privacy Policy",
};

export const viewport = "width=device-width, initial-scale=1";

export default function PrivacyPolicy() {
  return (
    <>
      <h1 className={styles.title}>SmartPark Privacy Policy.</h1>
      <h2 className={styles.subtitle}>Effective Date: 6/16/24</h2>
      <p className={styles.description}>
        Your privacy is important to us. This Privacy Policy outlines how SmartPark ("we", "our", "us") collects, uses, and protects your personal
        information when you use our app.
      </p>

      <h3 className={styles.sectionTitle}>1. Information We Collect</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Personal Information:</strong> Your name, email address, phone number, and physical address.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Location Data:</strong> GPS data to enhance your user experience and provide relevant parking options.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>IP Address:</strong> Collected automatically when you access our app.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Payment Information:</strong> Processed securely through Stripe for transactions.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Vehicle Information:</strong> Required when purchasing a parking spot.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>User Preferences:</strong> Such as notification, display, and messaging settings.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Usage Data:</strong> Information about how you interact with our app, including access times, device
          information, and browsing history.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>2. How We Use Your Information</h3>
      <ul className={styles.list}>
        <li className={styles.description}>Enhance and personalize your user experience.</li>
        <li className={styles.description}>Ensure the safety and security of our platform.</li>
        <li className={styles.description}>Match you with the best possible parking spots based on your location.</li>
        <li className={styles.description}>Conduct occasional promotions relevant to your location.</li>
      </ul>

      <h3 className={styles.sectionTitle}>3. Data Sharing</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Service Providers:</strong> Third-party vendors who assist in providing our services, such as payment
          processors and hosting services.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Legal Authorities:</strong> When required by law or to protect our rights and interests.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Other Users:</strong> As necessary to facilitate transactions and interactions on our platform.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Internal Analysis:</strong> For improving app performance and understanding user behaviors. Your data is
          analyzed internally to improve app performance and understand user behaviors.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>4. Data Storage and Security</h3>
      <p className={styles.description}>
        Your sensitive information is securely stored through Clerk, our authentication and session management service. We use SSL encryption to
        protect your data and maintain strict access control to our servers and databases. Regular security audits and updates ensure ongoing
        protection of your data.
      </p>

      <h3 className={styles.sectionTitle}>5. User Rights and Choices</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Access:</strong> Request a copy of your personal data we hold.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Update:</strong> Correct any inaccuracies in your personal data.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Delete:</strong> Request the deletion of your personal data.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Portability:</strong> Request your personal data in a structured, commonly used, and machine-readable
          format.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Restrict Processing:</strong> Request that we limit the processing of your personal data under certain
          circumstances.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Object:</strong> Object to the processing of your personal data for specific purposes.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Withdraw Consent:</strong> Withdraw your consent to data processing at any time.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>6. Compliance with Regulations</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>COPPA:</strong> We do not allow children under 16 to use our app, and we implement strict age verification.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>PCI DSS:</strong> We ensure secure handling of payment information in compliance with PCI DSS.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Other Applicable State and International Privacy Laws:</strong> We continually monitor and comply with other
          relevant privacy laws and regulations as they apply.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>7. Children's Privacy</h3>
      <p className={styles.description}>
        SmartPark is not intended for children under 16 years of age. We verify age through date of birth at sign-up and require identity verification
        for creating listings. If we become aware that we have collected personal data from a child under 16 without parental consent, we will delete
        that information immediately. Parents who believe their child has submitted personal data without their consent can contact us at{" "}
        <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
          hello@trysmartpark.com
        </a>
        .
      </p>

      <h3 className={styles.sectionTitle}>8. Data Retention and Deletion</h3>
      <p className={styles.description}>
        We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. If you
        wish to delete your data, you can request this by contacting us at{" "}
        <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
          hello@trysmartpark.com
        </a>
        . We will process data deletion requests in accordance with applicable laws and regulations.
      </p>

      <h3 className={styles.sectionTitle}>9. User Consent</h3>
      <p className={styles.description}>
        By using our services, you consent to the collection and processing of your personal data as described in this Privacy Policy. You can
        withdraw your consent at any time by adjusting your account settings or contacting us at{" "}
        <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
          hello@trysmartpark.com
        </a>
        .
      </p>

      <h3 className={styles.sectionTitle}>10. Changes to This Privacy Policy</h3>
      <p className={styles.description}>
        We may update this Privacy Policy from time to time. Any changes will be communicated through an in-app message. We encourage you to review
        this policy periodically to stay informed about how we are protecting your information.
      </p>

      <h3 className={styles.sectionTitle}>11. Contact Us</h3>
      <p className={styles.description}>
        If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
        <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
          hello@trysmartpark.com
        </a>
        .
      </p>
    </>
  );
}
