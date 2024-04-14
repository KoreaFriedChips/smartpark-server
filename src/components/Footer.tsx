"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../app/page.module.css";
import { useColorScheme } from "../hooks/ColorScheme";
import { Sparkles, Mail, Instagram, Youtube, TwitterIcon, YoutubeIcon, InstagramIcon } from "lucide-react";

export default function Footer() {
  const colorScheme = useColorScheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.headerContainer}>
        <a href="/" className={styles.logo}>
          <Image src={"/SMARTPARK-WAITLIST-ICON.png"} alt="SmartPark Logo" width={35} height={35} priority />
        </a>
        <nav className={styles.nav}>
        <p className={styles.footerText}>©️ 2024 SMARTPARK DIGITAL LLC.</p>
          <div className={styles.socialContainer}>
            <a href="https://instagram.com/trysmartpark" target="_blank" className={styles.button} role="button">
              <InstagramIcon size={14} />
            </a>
            <a href="https://youtube.com/@trysmartpark" target="_blank" className={styles.button} role="button">
              <YoutubeIcon size={14} />
            </a>
            <a href="https://twitter.com/trysmartpark" target="_blank" className={styles.button} role="button">
              <TwitterIcon size={14} />
            </a>
            <Link href={"?show=true"} className={styles.buttonMain} role="button">
              <Sparkles size={14} />
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
