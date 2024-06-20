import type { Metadata } from "next";
import React from "react";
import styles from "@/app/(legal)/legal.module.css";

export const metadata: Metadata = {
  title: "SmartPark: Terms of Service | Parking Marketplace",
  description:
    "Read SmartPark's Terms of Service. Understand your rights and responsibilities when using our parking marketplace platform. Effective from 6/16/24.",
  keywords: "SmartPark, terms of service, parking marketplace, user agreement, parking app terms, legal, privacy policy",
  authors: [{ name: "SmartPark Digital LLC" }],
  creator: "SmartPark Team",
  publisher: "SmartPark Digital LLC",
  openGraph: {
    title: "SmartPark Terms of Service | Parking Marketplace Agreement",
    description:
      "Review SmartPark's Terms of Service. Learn about user accounts, payments, liability, and more for our innovative parking marketplace platform.",
    url: "https://www.trysmartpark.com/terms-of-service",
    siteName: "SmartPark",
    images: [
      {
        url: "https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp",
        alt: "SmartPark Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartPark Terms of Service | Parking Marketplace",
    description:
      "Understand your rights and responsibilities on SmartPark. Review our Terms of Service for the innovative parking marketplace platform.",
    images: ["https://www.trysmartpark.com/SMARTPARK-DEMO-2.webp"],
    creator: "@SmartParkApp",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.trysmartpark.com/terms-of-service",
  },
  category: "Legal",
  classification: "Terms of Service",
};

export const viewport = "width=device-width, initial-scale=1";

export default function TermsOfService() {
  return (
    <>
      <h1 className={styles.title}>SmartPark Terms of Service.</h1>
      <h2 className={styles.subtitle}>Effective Date: 6/16/24</h2>
      <p className={styles.description}>
        Welcome to SmartPark! These Terms of Service ("Terms") govern your access to and use of the SmartPark platform, including our website, mobile
        applications, and other services (collectively, the "Services"). By accessing or using our Services, you agree to comply with and be bound by
        these Terms. If you do not agree to these Terms, you may not use the Services.
      </p>

      <h3 className={styles.sectionTitle}>1. Acceptance of Terms</h3>
      <p className={styles.description}>
        By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. These Terms
        constitute a legally binding agreement between you and SmartPark. If you do not agree to these Terms, you must immediately stop using the
        Services.
      </p>

      <h3 className={styles.sectionTitle}>2. Services Provided</h3>
      <p className={styles.description}>
        SmartPark provides a platform that connects individuals seeking parking spots ("Buyers") with property owners or managers offering parking
        spaces ("Sellers"). The Services include facilitating reservations, processing payments, and providing a platform for communication between
        Buyers and Sellers.
      </p>

      <h3 className={styles.sectionTitle}>3. User Accounts</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Account Creation:</strong> To access certain features of the Services, you must create an account. You agree
          to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate,
          current, and complete. Failure to provide accurate information may result in the suspension or termination of your account.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your
          account. SmartPark will not be liable for any losses or damages arising from unauthorized use of your account.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Account Suspension and Termination:</strong> SmartPark reserves the right to suspend or terminate your
          account if you violate these Terms or engage in fraudulent or harmful activities. We also reserve the right to manage, suspend, or terminate
          accounts at our discretion.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>4. Payments and Fees</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Payment Processing:</strong> Payments are processed securely through Stripe. Buyers are charged at the time
          of reservation, and Sellers receive payouts after the reservation is completed.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Transaction Fees:</strong> SmartPark charges a 7.5% fee on transactions, which is deducted from the payment
          made to Sellers. This fee is used to cover the costs of providing the Services and maintaining the platform.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Refunds and Cancellations:</strong> Cancellations and refunds are handled according to our cancellation
          policy. Users may request refunds by contacting SmartPark support via the app or by emailing{" "}
          <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
            hello@trysmartpark.com
          </a>
          . Refunds are issued at our discretion based on the circumstances surrounding the request.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Disputes:</strong> All payment disputes should be processed through SmartPark's support by emailing{" "}
          <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
            hello@trysmartpark.com
          </a>
          . SmartPark will work to resolve disputes in a timely manner, but we do not guarantee resolution to the satisfaction of all parties
          involved.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>5. User Conduct and Responsibilities</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Behavior:</strong> Users agree to use the Services in a lawful and respectful manner. Harassment, abuse, and
          other inappropriate conduct are strictly prohibited. Users who engage in such behavior may have their accounts suspended or terminated.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Compliance:</strong> Users must comply with all applicable laws and regulations when using the Services.
          Sellers are responsible for ensuring that their parking spaces comply with local zoning, safety regulations, and any other applicable laws.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>6. Data Collection and Privacy</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Information Collected:</strong> We collect personal information such as names, emails, phone numbers,
          addresses, vehicle information, and payment details. Location data is collected to enhance the user experience.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Data Use:</strong> The information collected is used to facilitate reservations, ensure platform security,
          improve the Services, and comply with legal obligations. We retain personal data for as long as necessary to fulfill these purposes unless a
          longer retention period is required or permitted by law. Users may request deletion of their data by contacting support. We do not sell user
          data to third parties.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Data Protection:</strong> We implement security measures to protect user data. Sensitive information is
          stored through Clerk, with SSL encryption and strict access controls. Regular security audits are conducted to ensure ongoing protection of
          user data.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>7. Liability and Disclaimers</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>No Insurance Provided:</strong> SmartPark does not offer insurance for parked vehicles. Users are
          responsible for securing their own insurance coverage for their vehicles and any other property.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Limitation of Liability:</strong> SmartPark is not liable for any direct, indirect, incidental, or
          consequential damages arising from the use of the Services, including but not limited to vehicle damage, theft, or personal injury, to the
          extent permitted by law. Some jurisdictions do not allow the exclusion or limitation of certain damages, so these exclusions may not apply
          to you. Users should consult local laws to understand their rights.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>8. Insurance Recommendations</h3>
      <p className={styles.description}>SmartPark strongly recommends that both Buyers and Sellers obtain appropriate insurance coverage:</p>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>General Liability Insurance:</strong> Covers claims for bodily injury and property damage resulting from
          business operations.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Commercial Property Insurance:</strong> Protects physical assets and can sometimes extend to cover
          third-party property damage.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Errors and Omissions Insurance:</strong> Covers claims arising from negligence, errors, or omissions in
          services provided.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Host Insurance Programs:</strong> Provides specific coverage for property owners.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>User Insurance Options:</strong> Users should consider purchasing insurance coverage for their vehicles
          while parked at listed locations.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>9. Landlord-Tenant Relationships</h3>
      <p className={styles.description}>
        Users acknowledge that by renting out parking spaces, they may be entering into a landlord-tenant relationship. Sellers must comply with all
        applicable local laws and regulations regarding such relationships. SmartPark is not responsible for any obligations arising from these
        relationships.
      </p>

      <h3 className={styles.sectionTitle}>10. Intellectual Property</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Content Ownership:</strong> All content on the Services, including text, images, and software, is the
          property of SmartPark or its licensors and is protected by intellectual property laws. Unauthorized use of the content is prohibited.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>User-Generated Content:</strong> By submitting content to the Services, including reviews, comments, images,
          and other materials, you grant SmartPark a non-exclusive, royalty-free, perpetual, and irrevocable license to use, modify, distribute, and
          display such content for marketing, promotional, and other purposes.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>11. Promotions and Referral Programs</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Incentives:</strong> SmartPark may offer promotional codes, discounts, and referral programs. These
          incentives are provided at our discretion and may be subject to additional terms and conditions.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Program Changes:</strong> SmartPark reserves the right to modify or terminate promotional programs and
          incentives at any time without notice. We also reserve the right to cancel, void, or reject any discount or promotion for any reason.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>12. Explicit Agreement</h3>
      <p className={styles.description}>
        By creating an account or using the Services, you explicitly agree to these Terms of Service. During the registration process, you will be
        required to check a box indicating your acceptance of these Terms. This agreement constitutes a legally binding contract between you and
        SmartPark.
      </p>

      <h3 className={styles.sectionTitle}>13. Compliance with Local Laws</h3>
      <p className={styles.description}>
        Users must comply with all applicable local laws, including but not limited to short-term rental laws, occupancy laws, permits, and zoning
        regulations. Failure to comply with these laws may result in the suspension or termination of your account.
      </p>

      <h3 className={styles.sectionTitle}>14. Dispute Resolution and Legal Matters</h3>
      <ul className={styles.list}>
        <li className={styles.description}>
          <strong className={styles.bold}>Dispute Resolution:</strong> All disputes related to these Terms or the use of the Services should be
          directed to SmartPark support by contacting us via the app or emailing{" "}
          <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
            hello@trysmartpark.com
          </a>
          . SmartPark encourages users to resolve disputes amicably. In the event of unresolved disputes, we offer mediation services through a
          third-party mediator. If mediation fails, disputes may be resolved through arbitration or in small claims court, as appropriate. Users agree
          to binding arbitration under the rules of the American Arbitration Association.
        </li>
        <li className={styles.description}>
          <strong className={styles.bold}>Jurisdiction and Governing Law:</strong> These Terms are governed by the laws of the State of Wyoming. Any
          legal actions or proceedings arising out of these Terms will be brought exclusively in the courts located in Wyoming.
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>15. Changes to Terms</h3>
      <p className={styles.description}>
        SmartPark reserves the right to modify these Terms at any time. Users will be notified of significant changes through the Services. Continued
        use of the Services constitutes acceptance of the modified Terms. Users are encouraged to review these Terms periodically to stay informed
        about any updates.
      </p>

      <h3 className={styles.sectionTitle}>16. Contact Information</h3>
      <p className={styles.description}>
        For questions or concerns regarding these Terms, please contact us at{" "}
        <a href="mailto:hello@trysmartpark.com" className={styles.underline}>
          hello@trysmartpark.com
        </a>
        .
      </p>
    </>
  );
}
