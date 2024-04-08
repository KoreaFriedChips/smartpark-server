"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";
import Link from "next/link";
import { Sparkles, Clapperboard } from "lucide-react";
import Script from "next/script";
import Modal from "@/components/Modal";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
  // useEffect(() => {
  //   if (window.prefinery) {
  //     window.prefinery = window.prefinery || function() {(window.prefinery.q = window.prefinery.q || []).push(arguments)};
  //   }
  // }, []);
  const show = searchParams?.show;

  return (
    <main className={styles.main}>
      {show ? <Modal /> : <Header />}
      <div className={styles.heroSection}>
        <div className={styles.hero}>
          <p className={styles.shadowText}>SMARTPARK WAITLIST</p>
          <h1 className={styles.title}>
            Parking made <i>smarter</i>.
          </h1>
          {/* <h1 className={styles.title}>Parking made <i><u>smarter</u></i>.</h1> */}
          <p className={styles.description}>SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid on spots.</p>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonBox}>
              {/* change "a" to "Link" for no refresh */}
              {/* <a href={"/?show=true"} className={styles.buttonMain} role="button"> */}
              <Link href={"?show=true"} className={styles.buttonMain} role="button">
                <Sparkles size={18} />
                <p>Join early access</p>
              </Link>
              <div className={styles.buttonDetails}>
                <p>&gt;15 seconds</p>
                <p>No commitment</p>
              </div>
            </div>
            <a href="https://youtube.com/trysmartpark" target="_blank" className={styles.button} role="button">
              <Clapperboard size={18} />
              <p>Watch trailer</p>
            </a>
          </div>
        </div>
      </div>
      <Image src={"/SMARTPARK-DEMO-2.png"} alt="SmartPark demo" className={styles.heroImage} width={1920} height={1080} priority />
    </main>
  );
}
