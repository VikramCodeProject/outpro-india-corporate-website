'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) {
          return;
        }

        const topEntry = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        setActiveSection(topEntry.target.id);
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-35% 0px -45% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Handle smooth scroll to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarOffset = 92;
      const top = element.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  // Navigation links
  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Clients', id: 'testimonials' },
  ];

  const sectionFlow = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
  const progressPercent = useMemo(() => {
    const idx = sectionFlow.indexOf(activeSection);
    if (idx <= 0) {
      return 0;
    }
    const maxIdx = sectionFlow.length - 1;
    return (idx / maxIdx) * 100;
  }, [activeSection]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('home');
              }}
            >
              <span className={styles.logoText}>Outpro</span>
              <span className={styles.logoDot}></span>
              <span className={styles.logoText}>India</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className={`${styles.navLinks} ${styles.desktop}`}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button - Desktop */}
          <div className={`${styles.ctaButton} ${styles.desktop}`}>
            <button
              onClick={() => scrollToSection('contact')}
              className={`${styles.getInTouchBtn} ${activeSection === 'contact' ? styles.ctaActive : ''}`}
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressFill} style={{ width: `${progressPercent}%` }}></span>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={styles.mobileMenuContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.closeBtnContainer}>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.closeBtn}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.mobileNavLinkActive : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.mobileCtaButton}>
            <button
              onClick={() => scrollToSection('contact')}
              className={styles.mobileGetInTouchBtn}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
