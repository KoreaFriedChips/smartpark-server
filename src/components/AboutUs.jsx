import styles from "../app/page.module.css";
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import {CircleCheckBig} from "lucide-react";
import {Download} from "lucide-react";

 const AboutUs = () => {
    return (
        <main>
            <div className={styles.aboutUsContainer}>
                <div className={styles.columnContainer}>
                    <div className={styles.listContainer}>
                        <CircleCheckBig />
                        <p>Low Industry Fees</p>
                    </div>

                    <div className={styles.listContainer}>
                        <CircleCheckBig />
                        <p>Secure Cashless Transactions</p>
                    </div>

                    <div className={styles.listContainer}>
                        <CircleCheckBig />
                        <p>Simple & Easy to Use</p>
                    </div>

                    <div className={styles.listContainer}>
                        <CircleCheckBig />
                        <p>Open Marketplace</p>
                    </div>

                    <div className={styles.downloadContainer}>
                        <Link href={""} className={styles.buttonDownload} role="button">
                            <Download size={18} />
                            <p>Download SmartPark</p>
                        </Link>
                    </div>

                </div> 

                <div>
                    <Image src={"/dris.webp"} className={styles.imageCircleCropper} width={60} height={60} alt="Dris CEO pfp"/>
                    
                    <p className={styles.aboutUsTextContainer}>
                        “Hey, I'm Dris, the CEO & Founder of SmartPark.
                        Along with the help of a few very talented friends,
                        we created SmartPark.</p>

                    <p className={styles.aboutUsTextContainer}>
                        We're excited to deliver a product we've all
                        been working very hard on and give back to
                        the community.”
                    </p>
                </div>

            </div>
            
        </main>

    );
};

export default AboutUs;