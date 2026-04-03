/**
 * Outpro.India Backend Server
 * Express.js server for contact form API and email notifications
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const CONTACT_RECIPIENT =
  process.env.CONTACT_RECEIVER_EMAIL ||
  process.env.EMAIL_USER ||
  'hello@outpro.india';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]
    .filter(Boolean)
    .flatMap((value) => value.split(',').map((item) => item.trim()))
);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.has(origin) ||
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email service is ready to send');
  }
});

/**
 * POST /api/contact
 * Accepts contact form submission and sends email notification
 * 
 * Required fields: name, email, service, message
 * Optional fields: company
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    // Input Validation
    const requiredFields = { name, email, service, message };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.trim() === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        error: 'VALIDATION_ERROR',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'INVALID_EMAIL',
      });
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str) => {
      return str.replace(/[<>]/g, '').trim();
    };

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      company: company ? sanitize(company) : 'Not provided',
      service: sanitize(service),
      message: sanitize(message),
    };

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${sanitizedData.name}</p>
      <p><strong>Email:</strong> ${sanitizedData.email}</p>
      <p><strong>Company:</strong> ${sanitizedData.company}</p>
      <p><strong>Service Interested:</strong> ${sanitizedData.service}</p>
      <hr>
      <h3>Message:</h3>
      <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: CONTACT_RECIPIENT,
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission - ${sanitizedData.name}`,
      html: emailContent,
    });

    // Optional: Send confirmation email to user
    if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sanitizedData.email,
        subject: 'We received your message - Outpro.India',
        html: `
          <h2>Thank you for contacting Outpro.India</h2>
          <p>Hi ${sanitizedData.name},</p>
          <p>We have received your message and will get back to you shortly.</p>
          <p>Best regards,<br>Outpro.India Team</p>
        `,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        submittedAt: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        recipient: CONTACT_RECIPIENT,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Don't expose internal error details to client
    const statusCode = error.code === 'EAUTH' ? 401 : 500;
    return res.status(statusCode).json({
      success: false,
      message: 'Failed to submit form. Please try again later.',
      error: 'SUBMISSION_ERROR',
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Outpro.India API Server',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      contact: 'POST /api/contact',
    },
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Outpro.India Backend Server`);
  console.log(`📡 Server running at http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✉️  Email Service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
  console.log(`🌐 CORS Origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}\n`);
});

module.exports = app;
