"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";
import Link from "next/link";
import { Sparkles, Clapperboard, Car, ParkingCircle, BadgeDollarSign, Wallet, ParkingMeter, HandHeart } from "lucide-react";
import Script from "next/script";
import Modal from "@/components/Modal";
import SelectVideos from "@/components/SelectVideos";
import DemoSection from "@/components/DemoSection";
import AboutUs from "@/components/AboutUs";
import Faq from "@/components/Faq";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home({ searchParams }: SearchParamProps) {
  // useEffect(() => {
  //   if (window.prefinery) {
  //     window.prefinery = window.prefinery || function() {(window.prefinery.q = window.prefinery.q || []).push(arguments)};
  //   }
  // }, []);
  const show = searchParams?.show;
  const ref = searchParams?.ref;

  return (
    <>
      <main className={styles.main}>
        {show ? <Modal referral={ref} /> : <Header />}
        <motion.div
          className={styles.heroSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}>
          <div className={styles.hero}>
            <p className={styles.shadowText}>SMARTPARK WAITLIST</p>
            <h1 className={styles.title}>
              Parking made <i>smarter</i>.
            </h1>
            {/* <h1 className={styles.title}>Parking made <i><u>smarter</u></i>.</h1> */}
            <p className={styles.description}>
              SmartPark is a real-time online marketplace that connects drivers with private parking spaces, enabling users to securely list and bid
              on spots.
            </p>
            <motion.div
              className={styles.buttonContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeInUp}>
              <div className={styles.buttonBox}>
                {/* change "a" to "Link" for no refresh */}
                {/* <a href={"/?show=true"} className={styles.buttonMain} role="button"> */}
                <Link href={ref ? `?show=true&ref=${ref}` : "?show=true"} className={styles.buttonMain} role="button">
                  <Sparkles size={18} />
                  <p>Join the waitlist</p>
                </Link>
                <div className={styles.buttonDetails}>
                  <p>&lt;15 seconds</p>
                  <p>Opt-out any time</p>
                </div>
              </div>
              <a href="https://youtu.be/nu-ic3TmaVQ" target="_blank" className={styles.button} role="button">
                <Clapperboard size={18} />
                <p>Watch trailer</p>
              </a>
            </motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeInUp}>
            <Image src={"/SMARTPARK-DEMO-2.webp"} alt="SmartPark demo" className={styles.heroImage} width={1920} height={1080} priority />
          </motion.div>
        </motion.div>

        {/* <p className={styles.miniDescription}>
          *Available for download on the Apple App Store and Google Play Store on <i>May 30th</i>.
        </p> */}
        <p className={styles.tiniDescription}>
          <i>
            By joining the waitlist, you agree to SmartPark's{" "}
            <a href="/terms-of-service" target="_blank" className={styles.underline}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" target="_blank" className={styles.underline}>
              Privacy Policy
            </a>
          </i>
          .
        </p>
      </main>
      <main className={styles.section}>
        <motion.div
          className={styles.heroSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}>
          <div className={styles.hero}>
            <p className={styles.shadowText}>ONLINE MARKETPLACE</p>
            <h1 className={styles.subtitle}>
              This is <i>SmartPark.</i>
            </h1>
            <p className={styles.subDescription}>
              Stop wasting time and money searching for parking. With SmartPark, find affordable parking spaces or list your own spot in seconds.
            </p>
          </div>
        </motion.div>
        <motion.div
          className={styles.bentoContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}>
          <div className={styles.bentoSection}>
            <div className={styles.bentoRow}>
              <div className={styles.bentoBox}>
                <div className={styles.bentoItem}>
                  <ParkingMeter size={28} className={styles.bentoIcon} />
                  <div className={styles.bentoText}>
                    <h2 className={styles.bentoTitle}>Find parking in a tap.</h2>
                    <p className={styles.bentoDescription}>
                      Quickly locate affordable parking spaces near your destination using advanced search filters, allowing you to find your perfect
                      spot instantly.
                    </p>
                  </div>
                </div>
                {/* <div className={styles.overlayHorizontal}></div> */}
                <div className={styles.bentoImage}>
                  <Image src={"/SMARTPARK-DEMO-4-SMALL.webp"} alt="SmartPark demo" width={400} height={192} priority />
                </div>
              </div>
              <div className={styles.bentoSection}>
                <div className={styles.bentoBox}>
                  <Wallet size={28} className={styles.bentoIcon} />
                  <div className={styles.bentoText}>
                    <h2 className={styles.bentoTitle}>Save time & money.</h2>
                    <p className={styles.bentoDescription}>
                      Compare prices and bid on the best deals based on your desired parking duration, with real-time updates to ensure you always
                      have access to the most current availability.
                    </p>
                  </div>
                </div>
                <div className={styles.bentoBox}>
                  <BadgeDollarSign size={28} className={styles.bentoIcon} />
                  {/* <div className={styles.bentoImage}>
                  <Image src={"/SMARTPARK-DEMO-1.png"} alt="SmartPark demo" width={1920} height={1080} priority />
                </div> */}
                  <div className={styles.bentoText}>
                    <h2 className={styles.bentoTitle}>Earn real $$$.</h2>
                    <p className={styles.bentoDescription}>
                      Earn passive income by listing your driveway, yard, or other property on SmartPark's secure platform, seamlessly managing
                      cashless payment processing and customer support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bentoBox}>
              <HandHeart size={28} className={styles.bentoIcon} />
              <div className={styles.bentoText}>
                <h2 className={styles.bentoTitle}>Community-driven platform.</h2>
                <p className={styles.bentoDescription}>
                  Join a growing community of users who are revolutionizing the way we think about parking. Help shape the future of parking by
                  providing feedback and suggestions to the SmartPark team. We'll listen!
                </p>
              </div>
              <div className={styles.bentoImageSide}>
                <Image src={"/SMARTPARK-DEMO-SMALL-ALT.webp"} alt="SmartPark demo" width={300} height={176} priority />
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* <main className={styles.sectionAlt}>
        <div className={styles.heroSection}>
          <div className={styles.hero}>
            <p className={styles.shadowText}>HOW IT WORKS</p>
            <h1 className={styles.subtitle}>
              <i>Clicks away</i> from your next spot.
            </h1>
            <p className={styles.subDescription}>With SmartPark's advanced features and intuitive functionality, start finding your next spot now.</p>
          </div>
        </div>
        <div>
          <SelectVideos />
        </div>
      </main>

      <main className={styles.sectionMiddle}>
        <div className={styles.heroSection}>
          <div className={styles.hero}>
            <p className={styles.shadowText}>APP FEATURES</p>
            <h1 className={styles.subtitle}>
              <i></i>Meet your next favorite app.
            </h1>
            <p className={styles.subDescriptionThin}>SmartPark is designed with the user in mind, offering a streamlined and intuitive experience that makes parking a breeze.</p>
          </div>
        </div>

        <div>
          <DemoSection />
        </div>
      </main>

      <main className={styles.sectionMiddle}>
        <div className={styles.heroSection}>
          <div className={styles.hero}>
            <p className={styles.shadowText}>OUR STORY</p>
            <h1 className={styles.subtitle}>The
              <i> future </i>of parking.
            </h1>
            <p className={styles.subDescriptionThinner}>SmartPark was created by a small team of young entrepreneurs, designers, creators, and developers to help solve parking issues within our communities.</p>
          </div>
        </div>     
        <div>
          <AboutUs />
        </div>
      </main>

      <main className={styles.sectionMiddle}>
        <div className={styles.heroSection}>
          <Faq />
        </div>
      </main> */}
    </>
  );
}
