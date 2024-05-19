"use client";

import styles from "../app/page.module.css";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const birdfiller = "/birdfiller.mp4";
const orangefiller = "/orangefiller.mp4";

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
                <h2 className={styles.bentoTitle}>Birds Title Placeholder</h2>
                <p className={styles.bentoDescription}>
                  Aliqua do tempor culpa voluptate anim pariatur pariatur tempor. Voluptate occaecat excepteur voluptate deserunt laborum magna labore minim reprehenderit reprehenderit reprehenderit ipsum ipsum. 
                </p>
              </div>
            </div>

            <div className={`${styles.selectBox} ${selectedVideo === orangefiller ? styles.selectedAccent : ''}`}>
              <div className={styles.bentoText} onClick={() => switchVideo(orangefiller)}>
                <h2 className={styles.bentoTitle}>Orange Title Placeholder</h2>
                <p className={styles.bentoDescription}>
                  Aliqua do tempor culpa voluptate anim pariatur pariatur tempor. Voluptate occaecat excepteur voluptate deserunt laborum magna labore minim reprehenderit reprehenderit reprehenderit ipsum ipsum.
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