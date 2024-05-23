"use client";

import styles from "../app/page.module.css";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const birdfiller = "/birdfiller.mp4";
const orangefiller = "/orangefiller.mp4";
const cowfiller = "/cowfiller.mp4";


function VideoSwitcher() {
  // init video and init state of selected box
  const [videoFile, setVideoFile] = useState(birdfiller);
  const [selectedVideo, setSelectedVideo] = useState(birdfiller);

  const switchVideo = (newFile) => {
    setVideoFile(newFile);
    setSelectedVideo(newFile);
  };

  return (
    <div className={styles.buttonContainer}>
      
      {/* Buttons to switch videos */}
      <div className={styles.bentoContainer}>
        <div className={styles.bentoRow}>
          <div className={styles.bentoSection}>
            <div className={`${styles.selectBox} ${selectedVideo === birdfiller ? styles.selectedAccent : ''}`}>
              <div className={styles.bentoText} onClick={() => switchVideo(birdfiller)}>
                <p className={styles.selectBoxIcon}><i>1</i></p>
                <h2 className={styles.bentoTitle}>Search & Bid.</h2>
                <p className={styles.selectBoxDescription}>
                Easily search, compare, and bid on available parking spots near you.
                </p>
              </div>
            </div>

            <div className={`${styles.selectBox} ${selectedVideo === orangefiller ? styles.selectedAccent : ''}`}>
              <div className={styles.bentoText} onClick={() => switchVideo(orangefiller)}>
                <p className={styles.selectBoxIcon}><i>2</i></p>
                <h2 className={styles.bentoTitle}>Hassle-Free Parking.</h2>
                <p className={styles.selectBoxDescription}>
                Secure your spot, pay through the app, and park your vehicle.
                </p>
              </div>
            </div>

            <div className={`${styles.selectBox} ${selectedVideo === cowfiller ? styles.selectedAccent : ''}`}>
              <div className={styles.bentoText} onClick={() => switchVideo(cowfiller)}>
                <p className={styles.selectBoxIcon}><i>3</i></p>
                <h2 className={styles.bentoTitle}>Earn Rewards.</h2>
                <p className={styles.selectBoxDescription}>
                  Leave a review of your experience or earn money from listing your spot.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Video Player */}
      <ReactPlayer className={`${styles.bentoSection} ${styles.videoPlayer}`} url={videoFile} playing={true} controls={false} muted={true} loop={true}/>
    
    </div>
    
  );
}

export default VideoSwitcher;