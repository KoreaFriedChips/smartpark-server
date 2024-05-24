import styles from "../app/page.module.css";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

 const AboutUs = () => {
    return (
        <main>
            <div className={styles.aboutUsContainer}>
                <div className={styles.columnContainer}>div1 with list and download button</div>
                <div className={styles.columnContainer}>div2 with text and profile picture</div>
            </div>
            
        </main>

    );
};

export default AboutUs;