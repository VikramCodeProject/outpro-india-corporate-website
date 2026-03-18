'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press', href: '#press' },
  ];

  const serviceLinks = [
    { label: 'Web Development', href: '#services' },
    { label: 'Mobile Apps', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Digital Marketing', href: '#services' },
    { label: 'Cloud Solutions', href: '#services' },
    { label: 'Brand Strategy', href: '#services' },
  ];

  const connectLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'tw' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'ig' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'fb' },
  ];

  const techStack = [
    'Next.js',
    'React',
    'Node.js',
    'PostgreSQL',
    'AWS',
    'Docker',
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.column}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>Outpro.India</h3>
            <p className={styles.brandDesc}>
              Premium digital solutions for forward-thinking businesses.
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className={styles.techStack}>
            <p className={styles.techLabel}>Tech Stack:</p>
            <div className={styles.techPills}>
              {techStack.map((tech) => (
                <span key={tech} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Company</h4>
          <ul className={styles.linkList}>
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Services</h4>
          <ul className={styles.linkList}>
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Section */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Connect</h4>
          <ul className={styles.linkList}>
            <li>
              <a href="mailto:hello@outpro.india" className={styles.link}>
                hello@outpro.india
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className={styles.link}>
                +91 98765 43210
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className={styles.socialIcons}>
            {connectLinks.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                title={link.label}
              >
                <span className={styles.iconText}>{link.icon.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <div className={styles.copyright}>
            <p>
              &copy; {currentYear} Outpro.India. All rights reserved. |{' '}
              <Link href="/privacy" className={styles.bottomLink}>
                Privacy Policy
              </Link>
              {' '} • {' '}
              <Link href="/terms" className={styles.bottomLink}>
                Terms of Service
              </Link>
              {' '} • {' '}
              <Link href="/cookies" className={styles.bottomLink}>
                Cookie Policy
              </Link>
            </p>
          </div>

          <div className={styles.madeWith}>
            <p>
              Made with <span className={styles.heart}>♥</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
