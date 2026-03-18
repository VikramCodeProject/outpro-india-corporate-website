'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import PortfolioCard from '@/components/PortfolioCard';
import TestimonialCard from '@/components/TestimonialCard';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css';

export default function Home() {
  // Services data
  const services = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Build scalable, responsive web applications with cutting-edge technology.',
      features: ['React & Next.js', 'API Integration', 'Performance Optimization'],
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile solutions for iOS and Android.',
      features: ['React Native', 'Native Development', 'App Store Deployment'],
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that captivate and convert users.',
      features: ['User Research', 'Wireframing', 'Interactive Prototypes'],
    },
    {
      icon: '📊',
      title: 'Digital Marketing',
      description: 'Strategic campaigns to amplify your brand and drive growth.',
      features: ['SEO & SEM', 'Social Media', 'Analytics & Reporting'],
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable infrastructure and deployments on AWS, GCP, and Azure.',
      features: ['Architecture Design', 'Migration Services', '24/7 Support'],
    },
    {
      icon: '✨',
      title: 'Brand Strategy',
      description: 'Comprehensive branding that resonates with your target audience.',
      features: ['Brand Identity', 'Messaging', 'Visual Guidelines'],
    },
  ];

  // Portfolio data
  const portfolio = [
    {
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop',
      title: 'E-Commerce Platform Redesign',
      client: 'TechRetail Co.',
      challenge: 'Outdated platform with low conversion rates and poor user experience.',
      solution: 'Complete redesign with modern UX patterns and performance optimization.',
      kpis: [
        { value: '150%', label: 'Traffic +' },
        { value: '45%', label: 'Conv. Rate ↑' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      title: 'SaaS Dashboard Development',
      client: 'DataFlow Systems',
      challenge: 'Complex data visualization and real-time updates needed.',
      solution: 'Built scalable dashboard with WebSocket integration and analytics.',
      kpis: [
        { value: '99.9%', label: 'Uptime' },
        { value: '2.1s', label: 'Load Time' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Mobile Banking App',
      client: 'FinanceHub',
      challenge: 'Security-first design with seamless user transactions.',
      solution: 'Native iOS & Android app with biometric authentication.',
      kpis: [
        { value: '4.8★', label: 'App Rating' },
        { value: '500K+', label: 'Downloads' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1560264357-8d9766d47c46?w=600&h=400&fit=crop',
      title: 'Brand Identity System',
      client: 'StartupX',
      challenge: 'Need comprehensive brand identity from scratch.',
      solution: 'Complete brand guidelines with logo, color palette, typography.',
      kpis: [
        { value: '80%', label: 'Recognition ↑' },
        { value: '3x', label: 'Brand Value' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      title: 'Enterprise CMS Platform',
      client: 'MediaCorp',
      challenge: 'Multi-user content management with workflow automation.',
      solution: 'Headless CMS with role-based access and publishing workflows.',
      kpis: [
        { value: '60%', label: 'Time Saved' },
        { value: '10x', label: 'Faster Deploy' },
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      title: 'Marketing Website Rebuild',
      client: 'BuildTech Solutions',
      challenge: 'SEO optimization and modern design implementation.',
      solution: 'Next.js website with SEO best practices and fast performance.',
      kpis: [
        { value: '#1', label: 'Google Rank' },
        { value: '280%', label: 'Organic ↑' },
      ],
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: 'Outpro.India transformed our entire digital presence. Their strategic approach and excellent execution delivered exceptional results.',
      author: 'Sarah Johnson',
      title: 'CEO',
      company: 'TechRetail Co.',
      rating: 5,
    },
    {
      quote: 'Working with the team was seamless. They understood our vision and delivered beyond expectations. Highly recommended!',
      author: 'Rajesh Kumar',
      title: 'Founder',
      company: 'DataFlow Systems',
      rating: 5,
    },
    {
      quote: 'Professional, creative, and results-driven. The team\'s attention to detail and commitment to excellence is unmatched.',
      author: 'Emma Rodriguez',
      title: 'Product Director',
      company: 'FinanceHub',
      rating: 5,
    },
    {
      quote: 'Outstanding work on our mobile app. The design is intuitive and the performance is incredible. Worth every penny!',
      author: 'Ahmed Hassan',
      title: 'CTO',
      company: 'StartupX',
      rating: 5,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Our Services</h2>
            <p>Comprehensive solutions for digital transformation</p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={styles.portfolioSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Our Work</h2>
            <p>Award-winning projects that deliver results</p>
          </div>

          <div className={styles.portfolioGrid}>
            {portfolio.map((project, idx) => (
              <PortfolioCard key={idx} {...project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Client Testimonials</h2>
            <p>Trusted by industry leaders</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactWrapper}>
            {/* Form */}
            <div className={styles.formCol}>
              <h2 className={styles.contactTitle}>Get in Touch</h2>
              <p className={styles.contactSubtitle}>
                Ready to start your next project? Let's talk about your ideas.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>Contact Information</h3>

                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>Email</p>
                  <a href="mailto:hello@outpro.india" className={styles.infoLink}>
                    hello@outpro.india
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>Phone</p>
                  <a href="tel:+919876543210" className={styles.infoLink}>
                    +91 98765 43210
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>Address</p>
                  <p className={styles.infoText}>
                    123 Tech Park
                    <br />
                    Bangalore, 560102
                    <br />
                    India
                  </p>
                </div>

                <div className={styles.infoItem}>
                  <p className={styles.infoLabel}>Office Hours</p>
                  <p className={styles.infoText}>
                    Monday - Friday
                    <br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
