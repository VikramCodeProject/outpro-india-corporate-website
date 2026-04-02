'use client';

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';
import { trackFormSubmission } from '@/lib/ga4-analytics';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    company: '',
    service: '',
    message: '',
    agree: false,
  });

  const [status, setStatus] = useState({
    submitted: false,
    error: null,
    loading: false,
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.from_name ||
      !formData.from_email ||
      !formData.service ||
      !formData.message
    ) {
      setStatus({
        submitted: false,
        error: 'Please fill all required fields',
        loading: false,
      });
      return;
    }

    if (!formData.agree) {
      setStatus({
        submitted: false,
        error: 'Please agree to privacy policy',
        loading: false,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      setStatus({
        submitted: false,
        error: 'Please enter a valid email address',
        loading: false,
      });
      return;
    }

    setStatus({ submitted: false, error: null, loading: true });

    try {
      // Option 1: Send via EmailJS (frontend)
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      ) {
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current
        );

        if (result.status !== 200) {
          throw new Error('EmailJS submission failed');
        }
      } else {
        // Option 2: Send via Next.js API route (backend)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.from_name,
            email: formData.from_email,
            company: formData.company,
            service: formData.service,
            message: formData.message,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Form submission failed');
        }
      }

      setStatus({ submitted: true, error: null, loading: false });
      setFormData({
        from_name: '',
        from_email: '',
        company: '',
        service: '',
        message: '',
        agree: false,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ submitted: false, error: null, loading: false });
      }, 5000);

      trackFormSubmission('contact_form', formData.service);
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus({
        submitted: false,
        error: err.message || 'Something went wrong. Please try again.',
        loading: false,
      });
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      {status.submitted && (
        <div className={styles.successMessage}>
          <span className={styles.checkmark}>✓</span>
          <p>Thank you! We'll be in touch shortly.</p>
        </div>
      )}

      {status.error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>!</span>
          <p>{status.error}</p>
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="from_name" className={styles.label}>
          Name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="from_name"
          name="from_name"
          value={formData.from_name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Your Name"
          required
          disabled={status.loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="from_email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="from_email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          className={styles.input}
          placeholder="your@email.com"
          required
          disabled={status.loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="company" className={styles.label}>
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={styles.input}
          placeholder="Your Company Name"
          disabled={status.loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="service" className={styles.label}>
          Service Interested <span className={styles.required}>*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={styles.input}
          required
          disabled={status.loading}
        >
          <option value="">-- Select a service --</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-apps">Mobile Apps</option>
          <option value="ui-ux-design">UI/UX Design</option>
          <option value="digital-marketing">Digital Marketing</option>
          <option value="cloud-solutions">Cloud Solutions</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Tell us about your project..."
          rows="6"
          required
          disabled={status.loading}
        ></textarea>
      </div>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          id="agree"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className={styles.checkbox}
          required
          disabled={status.loading}
        />
        <label htmlFor="agree" className={styles.checkboxLabel}>
          I agree to the privacy policy and terms of service
          <span className={styles.required}>*</span>
        </label>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status.loading}
        onClick={() => {
          // Track CTA button click in GA4
          if (window.gtag) {
            window.gtag('event', 'contact_form_click', {
              event_category: 'engagement',
            });
          }
        }}
      >
        {status.loading ? (
          <>
            <span className={styles.spinner}></span>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <p className={styles.formNote}>
        We typically respond within 24 hours during business days.
      </p>
    </form>
  );
};

export default ContactForm;
