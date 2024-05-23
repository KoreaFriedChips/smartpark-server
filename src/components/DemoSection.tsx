"use client";

import styles from "../app/page.module.css";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const DemoSection = () => {
  return (
    <div className="pt-15">
      <main className="main">
        <div className={styles.bentoContainer}>
          <div className={styles.bentoSection}>
            <div className={styles.bentoRow}>
              <div className={styles.bentoBox}>
                <img src="" alt="Real Clay" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>Real Clay</h3>
                </div>
              </div>
              
              <div className={styles.bentoBox}>
                <img src="" alt="Real Clay" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>Real Clay</h3>
                </div>
              </div>
            </div>
            
            <div className={styles.bentoRow}>
              <div className={styles.bentoBox}>
                <img src="" alt="Shadow Styles" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>Shadow Styles</h3>
                </div>
              </div>

              <div className={styles.bentoBox}>
                <img src="" alt="Orientations" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>Orientations</h3>
                </div>
              </div>

              <div className={styles.bentoBox}>
                <img src="" alt="Orientations" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>Design Privacy</h3>
                </div>
              </div>
            </div>

            <div className={styles.bentoRow}>
              <div className={styles.bentoBox}>
                <img src="" alt="Design Privacy" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>App Store Templates</h3>
                </div>
              </div>

              <div className="">
                <div className={styles.bentoBox}>
                  <img src="" alt="Design Privacy" className={styles.bentoImage} />
                  <div className={styles.bentoText}>
                    <h3 className={styles.bentoTitle}>8k</h3>
                  </div>
                </div>

                <div className={styles.bentoBox}>
                  <img src="" alt="Design Privacy" className={styles.bentoImage} />
                  <div className={styles.bentoText}>
                    <h3 className={styles.bentoTitle}>8k</h3>
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.bentoBox}>
                  <img src="" alt="Design Privacy" className={styles.bentoImage} />
                  <div className={styles.bentoText}>
                    <h3 className={styles.bentoTitle}>8k</h3>
                  </div>
                </div>

                <div className={styles.bentoBox}>
                  <img src="" alt="Design Privacy" className={styles.bentoImage} />
                  <div className={styles.bentoText}>
                    <h3 className={styles.bentoTitle}>8k</h3>
                  </div>
                </div>
              </div>

            </div>


            
            <div className={styles.bentoBox}>
                <img src="" alt="Design Privacy" className={styles.bentoImage} />
                <div className={styles.bentoText}>
                  <h3 className={styles.bentoTitle}>8k</h3>
                </div>
              </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoSection;