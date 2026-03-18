'use client';

import React from 'react';
import styles from './PortfolioCard.module.css';

const PortfolioCard = ({ image, title, client, challenge, solution, kpis, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`${styles.card} ${isEven ? styles.imageLeft : styles.imageRight}`}>
      {/* Image Section */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.imageOverlay}></div>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.client}>{client}</p>

          <div className={styles.details}>
            <div className={styles.detail}>
              <h4 className={styles.detailLabel}>Challenge</h4>
              <p className={styles.detailText}>{challenge}</p>
            </div>
            <div className={styles.detail}>
              <h4 className={styles.detailLabel}>Solution</h4>
              <p className={styles.detailText}>{solution}</p>
            </div>
          </div>

          {/* KPI Boxes */}
          <div className={styles.kpiSection}>
            {kpis.map((kpi, idx) => (
              <div key={idx} className={styles.kpiBox}>
                <div className={styles.kpiValue}>{kpi.value}</div>
                <div className={styles.kpiLabel}>{kpi.label}</div>
              </div>
            ))}
          </div>

          <a href="#contact" className={styles.viewCase}>
            View Case Study
            <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
