import styles from "../app/page.module.css";
import React, { useState } from 'react';

const Faq = () => {
    return (
        <main>
            <div className={styles.aboutUsContainer}>
                <div className={styles.columnContainer}>
                    <p className={styles.shadowText}>FREQUENTLY ASKED QUESTIONS</p>
                    <h1 className={styles.faqTitle}>
                        Why use SmartPark?
                    </h1>
                </div>

                <div className={styles.columnContainer}>2</div>
            </div>
        </main>
    );
};

export default Faq;