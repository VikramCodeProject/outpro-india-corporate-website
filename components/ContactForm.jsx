'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    agree: false,
  });

  const [status, setStatus] = useState({
    submitted: false,
    error: null,
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitted: false, error: 'Please fill all required fields', loading: false });
      return;
    }

    if (!formData.agree) {
      setStatus({ submitted: false, error: 'Please agree to privacy policy', loading: false });
      return;
    }

    setStatus({ submitted: false, error: null, loading: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus({ submitted: true, error: null, loading: false });
      setFormData({ name: '', email: '', subject: '', message: '', agree: false });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ submitted: false, error: null, loading: false });
      }, 5000);
    } catch (err) {
      setStatus({ submitted: false, error: 'Something went wrong. Please try again.', loading: false });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Your Name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={styles.input}
          placeholder="Project Inquiry"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Message
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
        />
        <label htmlFor="agree" className={styles.checkboxLabel}>
          I agree to the privacy policy
        </label>
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status.loading}
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
    </form>
  );
};

export default ContactForm;
