'use client';

import React from 'react';
import styles from './TestimonialCard.module.css';

const TestimonialCard = ({ quote, author, title, company, rating }) => {
  return (
    <div className={styles.card}>
      <div className={styles.quoteSection}>
        <p className={styles.quote}>"{quote}"</p>
      </div>

      <div className={styles.ratingSection}>
        <div className={styles.rating}>
          {[...Array(rating)].map((_, i) => (
            <span key={i} className={styles.star}>★</span>
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <span key={`empty-${i}`} className={`${styles.star} ${styles.empty}`}>★</span>
          ))}
        </div>
      </div>

      <div className={styles.authorSection}>
        <div className={styles.authorInfo}>
          <h4 className={styles.authorName}>{author}</h4>
          <p className={styles.authorTitle}>{title}</p>
          <p className={styles.company}>{company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
