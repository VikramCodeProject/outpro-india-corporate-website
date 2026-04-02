'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import styles from './PremiumSections.module.css';

const METRICS = [
  { value: '150+', label: 'Projects' },
  { value: '98%', label: 'Satisfaction' },
  { value: '50+', label: 'Clients' },
  { value: '6+', label: 'Years' },
  { value: '<2.5s', label: 'Load' },
  { value: '97+', label: 'PageSpeed' },
];

const VALUES = [
  {
    icon: '◉',
    title: 'Precision',
    description: 'We engineer each experience with measurable clarity and exact execution.',
  },
  {
    icon: '◌',
    title: 'Performance',
    description: 'Speed, reliability, and conversion-first architecture are default standards.',
  },
  {
    icon: '◇',
    title: 'Transparency',
    description: 'Clear roadmaps, visible milestones, and honest delivery at every stage.',
  },
  {
    icon: '◈',
    title: 'Scalability',
    description: 'Systems designed to grow with your business across products and markets.',
  },
];

const TEAM = [
  { name: 'Arjun Patel', role: 'Chief Executive Officer' },
  { name: 'Divya Singh', role: 'Head of Design' },
  { name: 'Rohan Verma', role: 'Lead Engineer' },
  { name: 'Meera Joshi', role: 'Growth Strategist' },
];

const getInitials = (fullName) =>
  fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

export function PremiumHero() {
  return (
    <section id="home" className={`${styles.hero} reveal-section`}>
      <div className={styles.heroGrid}></div>
      <div className={`${styles.orb} ${styles.orbOne}`}></div>
      <div className={`${styles.orb} ${styles.orbTwo}`}></div>
      <div className={`${styles.orb} ${styles.orbThree}`}></div>

      <div className={styles.heroContent}>
        <div className={`${styles.eyebrow} ${styles.fadeUp}`} style={{ animationDelay: '120ms' }}>
          <span className={styles.eyebrowLine}></span>
          <span>Corporate Digital Platform</span>
        </div>

        <h1 className={`${styles.heroTitle} ${styles.fadeUp}`} style={{ animationDelay: '260ms' }}>
          Building <em>digital</em> identities that convert &amp; inspire
        </h1>

        <p className={`${styles.heroSubtitle} ${styles.fadeUp}`} style={{ animationDelay: '420ms' }}>
          Outpro.India crafts premium digital products, high-velocity experiences, and strategic
          growth engines for ambitious organizations.
        </p>

        <div className={`${styles.heroActions} ${styles.fadeUp}`} style={{ animationDelay: '560ms' }}>
          <a href="#portfolio" className={styles.primaryBtn}>
            View Our Work
          </a>
          <a href="#contact" className={styles.ghostBtn}>
            Start a Project
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLine}></span>
        <span className={styles.scrollText}>SCROLL</span>
      </div>

      <span className={styles.cornerIndex}>01</span>
    </section>
  );
}

export function MetricsTickerBar() {
  const tickerItems = useMemo(() => [...METRICS, ...METRICS], []);

  return (
    <section className={`${styles.tickerSection} reveal-section`}>
      <div className={styles.tickerTrack}>
        {tickerItems.map((item, index) => (
          <article className={styles.metricItem} key={`${item.value}-${item.label}-${index}`}>
            <span className={styles.metricValue}>{item.value}</span>
            <span className={styles.metricLabel}>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AboutUsSection() {
  return (
    <section id="about" className={`${styles.about} reveal-section`}>
      <div className={styles.container}>
        <header className={styles.aboutHeader}>
          <p className={styles.sectionLabel}>
            <span className={styles.labelLine}></span>
            About Us
          </p>
          <h2 className={styles.aboutTitle}>Crafting digital excellence since 2018</h2>
        </header>

        <div className={styles.aboutLayout}>
          <div className={styles.storyCol}>
            <p>
              Outpro.India began as a compact, high-trust team focused on solving one hard problem:
              helping brands turn digital presence into real business momentum.
            </p>
            <p>
              Over the years, we evolved into a full-stack agency model, combining strategic planning,
              elegant design systems, and robust engineering discipline under one premium delivery flow.
            </p>
            <p>
              Today, we partner with founders and enterprise teams to architect platforms that are
              visually distinct, technically resilient, and conversion-focused from day one.
            </p>

            <div className={styles.missionBlock}>
              <div className={styles.missionRow}>
                <span className={styles.rowLabel}>Mission</span>
                <p>Design digital systems that increase clarity, confidence, and measurable growth.</p>
              </div>
              <div className={styles.missionRow}>
                <span className={styles.rowLabel}>Vision</span>
                <p>Become India&rsquo;s benchmark agency for premium digital transformation delivery.</p>
              </div>
            </div>
          </div>

          <div className={styles.valuesCol}>
            <div className={styles.valuesGrid}>
              {VALUES.map((value) => (
                <article key={value.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>

            <div className={styles.teamGrid}>
              {TEAM.map((member) => (
                <article className={styles.teamCard} key={member.name}>
                  <div className={styles.avatarCircle}>{getInitials(member.name)}</div>
                  <div>
                    <p className={styles.memberName}>{member.name}</p>
                    <p className={styles.memberRole}>{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PremiumSections() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = Array.from(document.querySelectorAll('.reveal-section'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    sectionRefs.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.revealRoot}>
      <PremiumHero />
      <MetricsTickerBar />
      <AboutUsSection />
    </div>
  );
}
