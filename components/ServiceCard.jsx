'use client';

import React from 'react';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      {features && (
        <ul className={styles.featuresList}>
          {features.map((feature, idx) => (
            <li key={idx} className={styles.featureItem}>
              <span className={styles.checkmark}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <a href="#contact" className={styles.learnMore}>
        Learn More
        <span className={styles.arrow}>→</span>
      </a>
    </div>
  );
};

export default ServiceCard;
