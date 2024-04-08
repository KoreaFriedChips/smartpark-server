"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../app/page.module.css";
import { useColorScheme } from "../hooks/ColorScheme";
import { Sparkles, Mail } from "lucide-react";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const colorScheme = useColorScheme();

  const handleScroll = () => {
    const offset = window.scrollY;
    console.log(offset);
    if (offset > 100) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${hasScrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.headerContainer}>
        <a href="#" className={styles.logo}>
          <Image src={colorScheme === "dark" ? "/SMARTPARK-WEB-LOGO-DARK-min.png" : "/SMARTPARK-WEB-LOGO-LIGHT-min.png"} alt="SmartPark Logo" width={202} height={30} priority />
        </a>
        <nav className={styles.nav}>
          <a href="mailto:hello@trysmartpark.com" className={styles.button} role="button">
            <Mail size={18} />
          </a>
          <Link href={"?show=true"} className={styles.buttonMain} role="button">
            <Sparkles size={18} />
            <p>Join</p>
          </Link>
        </nav>
      </div>
    </header>
  );
}
