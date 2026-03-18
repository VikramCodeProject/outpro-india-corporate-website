'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Handle smooth scroll to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            <Link href="#home">
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
                  className={styles.navLink}
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
              className={styles.getInTouchBtn}
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
                  className={styles.mobileNavLink}
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
