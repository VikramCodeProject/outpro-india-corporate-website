'use client';

import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Elevate Your <span className={styles.highlight}>Digital</span> Presence
        </h1>
        <p className={styles.heroSubtitle}>
          Premium digital solutions for forward-thinking businesses. Transform your vision
          into reality with cutting-edge technology and strategic design.
        </p>

        <div className={styles.ctaButtonGroup}>
          <button
            onClick={() => scrollToSection('contact')}
            className={styles.primaryCta}
          >
            Get Started
            <span className={styles.arrow}>→</span>
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={styles.secondaryCta}
          >
            Explore Our Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot}></div>
      </div>
    </section>
  );
};

export default Hero;
