import React from 'react';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.heading}>Apply to HandIJob!</h1>
        <p>Take your career further with HandIJob</p>
      </div>
      <div className={styles.right}>
        <img src='/landing.svg' alt='' />
      </div>
    </div>
  );
};
