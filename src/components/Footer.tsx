"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../app/page.module.css";
import { useColorScheme } from "../hooks/ColorScheme";
import { FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import { PiTiktokLogo, PiTiktokLogoLight } from "react-icons/pi";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const colorScheme = useColorScheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.headerContainer}>
        <div className={styles.footerContainer}>
          <div>
            <a href="#">
              <Image
                src={colorScheme === "dark" ? "/SMARTPARK-WEB-LOGO-DARK.webp" : "/SMARTPARK-WEB-LOGO-LIGHT.png"}
                alt="SmartPark Logo"
                width={202}
                height={30}
                priority
              />
            </a>
            <p className={styles.footerTitle}>Parking made <i>smarter</i>.</p>

            {/* <a href="#" className={styles.logo}>
              <Image src={"/SMARTPARK-WAITLIST-ICON.png"} alt="SmartPark Logo" width={35} height={35} priority />
            </a> */}
          </div>

          <div className={styles.footerContainerRight}>
            <div className={styles.columnContainer}>
              <h3 className={styles.footerHeader}>SmartPark App</h3>
              <Link href="https://www.apple.com/app-store/" className={styles.footerList}>
                App Store
              </Link>
              <Link href="https://play.google.com/store" className={styles.footerList}>
                Google Play Store
              </Link>
              <Link href="https://youtube.com/@trysmartpark" className={styles.footerList}>
                App Trailer
              </Link>
              <Link href="https://youtube.com/@trysmartpark" className={styles.footerList}>
                Demo
              </Link>
            </div>

            <div className={styles.columnContainer}>
              <h3 className={styles.footerHeader}>About SmartPark</h3>
              <Link href="/" className={styles.footerList}>
                Our Story
              </Link>
              <Link href="/" className={styles.footerList}>
                Team
              </Link>
              <Link href="/" className={styles.footerList}>
                Careers
              </Link>
              <Link href="/" className={styles.footerList}>
                Press Kit
              </Link>
            </div>

            <div className={styles.columnContainer}>
              <h3 className={styles.footerHeader}>Socials</h3>
              <Link href="https://instagram.com/trysmartpark" target="_blank" className={styles.footerList}>
                Instagram
              </Link>
              <Link href="https://tiktok.com/@trysmartpark" target="_blank" className={styles.footerList}>
                TikTok
              </Link>
              <Link href="https://youtube.com/@trysmartpark" target="_blank" className={styles.footerList}>
                YouTube
              </Link>
              <Link href="https://linkedin.com/company/smartpark-digital" target="_blank" className={styles.footerList}>
                LinkedIn
              </Link>
            </div>

            <div className={styles.columnContainer}>
              <h3 className={styles.footerHeader}>Legal</h3>
              <Link href="/terms-of-service" className={styles.footerList}>
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className={styles.footerList}>
                Privacy Policy
              </Link>
              <Link href="/contact" className={styles.footerList}>
                Contact
              </Link>
            </div>
          </div>
        </div>

        <nav className={styles.nav}>
          <p className={styles.footerText}>©️ 2024 SMARTPARK DIGITAL LLC.</p>
          <div className={styles.socialContainer}>
            <a href="https://instagram.com/trysmartpark" target="_blank" className={styles.button} role="button">
              <FiInstagram size={14} />
            </a>
            <a href="https://instagram.com/trysmartpark" target="_blank" className={styles.button} role="button">
              <PiTiktokLogo size={14} />
            </a>
            <a href="https://youtube.com/@trysmartpark" target="_blank" className={styles.button} role="button">
              <FiYoutube size={14} />
            </a>
            <a href="https://twitter.com/trysmartpark" target="_blank" className={styles.button} role="button">
              <FiLinkedin size={14} />
            </a>
            <Link href={"/?show=true"} className={styles.buttonMain} role="button">
              <Sparkles size={14} />
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
