/**
 * Next.js API Route: /api/contact
 * Handles contact form submissions with email notifications
 * 
 * Route: POST /api/contact
 * Body: { name, email, company, service, message }
 */

import nodemailer from 'nodemailer';

const CONTACT_RECIPIENT =
  process.env.CONTACT_RECEIVER_EMAIL ||
  process.env.EMAIL_USER ||
  'hello@outpro.india';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Input validation function
const validateInput = (data) => {
  const { name, email, service, message } = data;
  const errors = [];

  if (!name || name.trim() === '') errors.push('name');
  if (!email || email.trim() === '') errors.push('email');
  if (!service || service.trim() === '') errors.push('service');
  if (!message || message.trim() === '') errors.push('message');

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('email_invalid');
  }

  return errors;
};

// Sanitize input to prevent XSS
const sanitizeInput = (str) => {
  return str.replace(/[<>]/g, '').trim();
};

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { name, email, company, service, message } = req.body;

    // Validate input
    const validationErrors = validateInput({ name, email, service, message });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: company ? sanitizeInput(company) : 'Not provided',
      service: sanitizeInput(service),
      message: sanitizeInput(message),
    };

    // Create HTML email for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #1a73e8;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
          <p><strong>Company:</strong> ${sanitizedData.company}</p>
          <p><strong>Service Interested:</strong> ${sanitizedData.service}</p>
        </div>
        <h3 style="color: #1a73e8;">Message:</h3>
        <div style="background: #white; padding: 15px; border-left: 4px solid #1a73e8;">
          <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">Submitted on: ${new Date().toLocaleString('en-US', {
          timeZone: 'UTC',
        })} UTC</p>
      </div>
    `;

    const emailStatus = {
      adminNotification: 'skipped',
      userConfirmation: 'skipped',
    };

    // Do not block form submissions if SMTP is temporarily failing.
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: CONTACT_RECIPIENT,
        replyTo: sanitizedData.email,
        subject: `🎯 New Contact: ${sanitizedData.name}`,
        html: adminEmailHtml,
      });
      emailStatus.adminNotification = 'sent';
    } catch (emailError) {
      emailStatus.adminNotification = 'failed';
      console.error('Admin notification email failed:', emailError);
    }

    // Send confirmation email to user (optional)
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      const userEmailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1a73e8;">Thank You!</h2>
          <p>Hi <strong>${sanitizedData.name}</strong>,</p>
          <p>We have received your message and will get back to you as soon as possible. Our team typically responds within 24 hours.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 30px;">Best regards,<br><strong>Outpro.India Team</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: sanitizedData.email,
          subject: 'We received your message - Outpro.India',
          html: userEmailHtml,
        });
        emailStatus.userConfirmation = 'sent';
      } catch (emailError) {
        emailStatus.userConfirmation = 'failed';
        console.error('User confirmation email failed:', emailError);
      }
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Form received successfully',
      data: {
        submittedAt: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        recipient: CONTACT_RECIPIENT,
        emailStatus,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Don't expose sensitive error details
    return res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again later.',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'SUBMISSION_ERROR',
    });
  }
}
