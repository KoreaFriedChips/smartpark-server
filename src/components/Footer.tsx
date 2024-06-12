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
        {/* <a href="#" className={styles.logo}>
          <Image src={colorScheme === "dark" ? "/SMARTPARK-WEB-LOGO-DARK.png" : "/SMARTPARK-WEB-LOGO-LIGHT.png"} alt="SmartPark Logo" width={175} height={26} priority />
        </a> */}
        {/* <a href="#" className={styles.logo}>
          <Image src={"/SMARTPARK-WAITLIST-ICON.png"} alt="SmartPark Logo" width={35} height={35} priority />
        </a> */}
        
        <div className={styles.footerContainer}>

          <div>
          <Image src={colorScheme === "dark" ? "/SMARTPARK-WEB-LOGO-DARK.webp" : "/SMARTPARK-WEB-LOGO-LIGHT.png"} alt="SmartPark Logo" width={202} height={30} priority />
          </div>

          <div className={styles.columnContainer}>
            <h3 className={styles.footerHeader}> More</h3>
            <p className={styles.footerList}>page 1</p>
            <p className={styles.footerList}>page 2</p>
            <p className={styles.footerList}>page 3</p>
            <p className={styles.footerList}>page 4</p>
            <p className={styles.footerList}>page 5</p>
          </div>

          <div className={styles.columnContainer}>
            <h3 className={styles.footerHeader}> About Smart Park</h3>
            <p className={styles.footerList}>page 1</p>
            <p className={styles.footerList}>page 2</p>
            <p className={styles.footerList}>page 3</p>
            <p className={styles.footerList}>page 4</p>
          </div>

          <div className={styles.columnContainer}>
            <h3 className={styles.footerHeader}> Legal</h3>
            <p className={styles.footerList}>page 1</p>
          </div>

          <div className={styles.columnContainer}>
            <h3 className={styles.footerHeader}> Join the wait list</h3>
          </div>

        </div>

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
