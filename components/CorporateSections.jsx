'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ContactForm from './ContactForm';
import { trackPortfolioCardView } from '@/lib/ga4-analytics';
import styles from './CorporateSections.module.css';

const services = [
  {
    number: '01',
    icon: '⌘',
    title: 'Web Development',
    description:
      'Enterprise-grade web platforms engineered for speed, scalability, and measurable business impact.',
  },
  {
    number: '02',
    icon: '◉',
    title: 'Mobile Applications',
    description:
      'High-performance mobile experiences across iOS and Android with product-first architecture.',
  },
  {
    number: '03',
    icon: '✦',
    title: 'UI/UX Design',
    description:
      'Conversion-focused interfaces that combine elegant visuals with frictionless user journeys.',
  },
  {
    number: '04',
    icon: '▣',
    title: 'Digital Marketing',
    description:
      'Data-backed growth campaigns that align brand storytelling with real acquisition outcomes.',
  },
  {
    number: '05',
    icon: '⬡',
    title: 'Cloud & DevOps',
    description:
      'Resilient cloud infrastructure, automated CI/CD pipelines, and performance-first operations.',
  },
  {
    number: '06',
    icon: '◇',
    title: 'Brand Strategy',
    description:
      'Positioning frameworks and identity systems designed to sharpen recall and category authority.',
  },
];

const portfolioProjects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Dev',
    kpi: '+240% Revenue',
    bg: '#1a1a2e',
    monogram: 'EC',
  },
  {
    title: 'FinTech Dashboard',
    category: 'UI/UX',
    kpi: '98% Retention',
    bg: '#16213e',
    monogram: 'FD',
  },
  {
    title: 'Healthcare App',
    category: 'Mobile',
    kpi: '50K+ Downloads',
    bg: '#0f3460',
    monogram: 'HA',
  },
  {
    title: 'SaaS Analytics',
    category: 'Cloud',
    kpi: '3x Faster',
    bg: '#2d132c',
    monogram: 'SA',
  },
  {
    title: 'Retail Brand',
    category: 'Branding',
    kpi: '4x Recall',
    bg: '#1b3a1b',
    monogram: 'RB',
  },
  {
    title: 'EdTech Portal',
    category: 'Web Dev',
    kpi: '1M+ Users',
    bg: '#1b262c',
    monogram: 'EP',
  },
];

const testimonialFilters = ['All', 'Technology', 'Retail', 'Finance'];

const testimonials = [
  {
    name: 'Rajeev Sharma',
    company: 'TechVentures',
    role: 'Technology',
    quote:
      'Outpro.India turned our fragmented digital stack into a unified growth platform. Their delivery precision is world-class.',
  },
  {
    name: 'Priya Nair',
    company: 'BloomRetail',
    role: 'Retail',
    quote:
      'The team blended premium design with practical conversion thinking. We saw stronger engagement across every channel.',
  },
  {
    name: 'Amit Mehta',
    company: 'FinBridge',
    role: 'Finance',
    quote:
      'From UX architecture to engineering rigor, every decision had strategic intent. The execution quality exceeded expectations.',
  },
  {
    name: 'Sneha Kapoor',
    company: 'GreenLeaf',
    role: 'Retail',
    quote:
      'They operate like a true strategic partner, not a vendor. Our digital roadmap is now sharper, faster, and scalable.',
  },
];

const contactItems = [
  { icon: '◻', label: 'Email', value: 'hello@outpro.india' },
  { icon: '◻', label: 'Phone', value: '+91 98765 43210' },
  { icon: '◻', label: 'Location', value: 'Bengaluru, India' },
  { icon: '◻', label: 'Hours', value: 'Mon - Fri, 9:00 AM - 6:00 PM' },
];

export default function CorporateSections() {
  const revealRef = useRef([]);
  const trackedPortfolioCards = useRef(new Set());
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'All') {
      return testimonials;
    }
    return testimonials.filter((item) => item.role === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    revealRef.current = Array.from(document.querySelectorAll('[data-reveal="corporate"]'));

    if (!revealRef.current.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );

    revealRef.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('[data-portfolio-card]'));

    if (!cards.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const { title, category } = entry.target.dataset;
          const trackingKey = `${title}-${category}`;

          if (!trackedPortfolioCards.current.has(trackingKey)) {
            trackPortfolioCardView(title, category);
            trackedPortfolioCards.current.add(trackingKey);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.55, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="services"
        data-reveal="corporate"
        className={`${styles.sectionWrap} ${styles.revealSection}`}
        style={{
          '--reveal-delay': '60ms',
          '--reveal-duration': '680ms',
          '--reveal-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Services</p>
            <h2>Strategic Capabilities Built for Scale</h2>
          </header>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.number}>
                <span className={styles.serviceNum}>{service.number}</span>
                <span className={styles.serviceIcon}>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className={styles.serviceArrow} aria-hidden="true">
                  →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        data-reveal="corporate"
        className={`${styles.sectionWrap} ${styles.revealSection}`}
        style={{
          '--reveal-delay': '140ms',
          '--reveal-duration': '760ms',
          '--reveal-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Portfolio</p>
            <h2>Selected Projects with Business Outcomes</h2>
          </header>

          <div className={styles.portfolioGrid}>
            {portfolioProjects.map((project) => (
              <article
                key={project.title}
                data-portfolio-card="true"
                data-title={project.title}
                data-category={project.category}
                className={styles.portfolioCardWrap}
              >
                <div className={styles.portfolioCard} style={{ backgroundColor: project.bg }}>
                  <div className={styles.gridOverlay}></div>
                  <span className={styles.monogram}>{project.monogram}</span>
                  <div className={styles.cardOverlay}>
                    <p className={styles.overlayCategory}>{project.category}</p>
                    <h3>{project.title}</h3>
                    <span className={styles.kpiBadge}>{project.kpi}</span>
                  </div>
                </div>
                <div className={styles.portfolioMeta}>
                  <p className={styles.metaTitle}>{project.title}</p>
                  <p className={styles.metaKpi}>{project.kpi}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        data-reveal="corporate"
        className={`${styles.sectionWrap} ${styles.revealSection}`}
        style={{
          '--reveal-delay': '220ms',
          '--reveal-duration': '840ms',
          '--reveal-ease': 'cubic-bezier(0.12, 0.9, 0.2, 1)',
        }}
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Testimonials</p>
            <h2>What Our Clients Say</h2>
          </header>

          <div className={styles.testimonialsLayout}>
            <nav className={styles.filterNav} aria-label="Testimonial filters">
              {testimonialFilters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
                >
                  {filter}
                </button>
              ))}
            </nav>

            <div className={styles.testimonialsStack}>
              {filteredTestimonials.map((item) => (
                <article className={styles.testimonialCard} key={`${item.name}-${item.company}`}>
                  <span className={styles.quoteMark}>“</span>
                  <p className={styles.testimonialQuote}>{item.quote}</p>
                  <div className={styles.clientRow}>
                    <div className={styles.avatarCircle} aria-hidden="true">
                      {item.name
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                    </div>
                    <div>
                      <p className={styles.clientName}>{item.name}</p>
                      <p className={styles.clientRole}>
                        {item.role} | {item.company}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        data-reveal="corporate"
        className={`${styles.sectionWrap} ${styles.revealSection}`}
        style={{
          '--reveal-delay': '280ms',
          '--reveal-duration': '900ms',
          '--reveal-ease': 'cubic-bezier(0.18, 0.88, 0.25, 1)',
        }}
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Contact</p>
            <h2>Start Your Next Digital Move</h2>
          </header>

          <div className={styles.contactLayout}>
            <aside className={styles.contactDetails}>
              {contactItems.map((item) => (
                <article key={item.label} className={styles.detailItem}>
                  <span className={styles.detailIcon}>{item.icon}</span>
                  <div>
                    <p className={styles.detailLabel}>{item.label}</p>
                    <p className={styles.detailValue}>{item.value}</p>
                  </div>
                </article>
              ))}
            </aside>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
