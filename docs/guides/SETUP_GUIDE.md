# Outpro.India Backend & Frontend Integration Guide

Complete setup instructions for the Node.js/Next.js backend and frontend integrations.

## 📋 Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Task 1: Node.js Express Backend](#task-1-nodejs-express-backend)
3. [Task 2: EmailJS Integration](#task-2-emailjs-integration)
4. [Task 3: Google Analytics 4](#task-3-google-analytics-4)
5. [Task 4: SEO Meta Tags](#task-4-seo-meta-tags)
6. [Task 5: Performance Optimization](#task-5-performance-optimization)

---

## Installation & Setup

### Install Dependencies

```bash
npm install
```

This will install all required packages:
- **Frontend**: Next.js, React, @emailjs/browser
- **Backend**: Express, Nodemailer, CORS, dotenv

### Copy Environment Variables

```bash
cp .env.example .env
```

Then update `.env` with your actual credentials.

---

## Task 1: Node.js Express Backend

### Overview

A standalone Express.js server for handling contact form submissions with email notifications.

### Files Created

- **`server.js`** - Express server with contact form API
- **`pages/api/contact.js`** - Alternative Next.js API route

### Setup Instructions

#### Option A: Standalone Express Server (Recommended for scalability)

1. **Configure Email Service (Gmail)**

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Factor Authentication
   - Generate an [App Password](https://myaccount.google.com/apppasswords)
   - Copy the 16-character password

2. **Update `.env` File**

   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   SEND_CONFIRMATION_EMAIL=true
   ```

3. **Start the Server**

   ```bash
   node server.js
   ```

   Expected output:
   ```
   🚀 Outpro.India Backend Server
   📡 Server running at http://localhost:5000
   🔧 Environment: development
   ✉️  Email Service: gmail
   🌐 CORS Origin: http://localhost:3000
   ```

4. **Test the API**

   ```bash
   curl -X POST http://localhost:5000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "company": "Acme Corp",
       "service": "web-development",
       "message": "I need a new website"
     }'
   ```

#### Option B: Next.js API Route

If you prefer to run everything in Next.js:

1. Update `.env.local` with email credentials
2. The API is automatically available at `POST /api/contact`
3. Frontend form will automatically use this endpoint

### API Endpoints

#### POST /api/contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "service": "web-development",
  "message": "Project details here..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "submittedAt": "2024-03-31T10:30:00.000Z",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name", "email"]
}
```

### Features

✅ Input validation (required fields, email format)  
✅ XSS prevention (sanitization)  
✅ Email notifications to `hello@outpro.india`  
✅ Optional confirmation email to user  
✅ CORS configuration for frontend  
✅ Comprehensive error handling  
✅ Environment-based configuration  

---

## Task 2: EmailJS Integration

### Overview

EmailJS allows frontend-to-backend email sending without a backend server. Supports both:
- **EmailJS** (client-side, no backend needed)
- **Next.js API route** (with proper backend)

### Files Updated

- **`components/ContactForm.jsx`** - Updated with EmailJS integration
- **`package.json`** - Added @emailjs/browser dependency

### Setup Instructions

#### Step 1: Create EmailJS Account

1. Go to [emailjs.com](https://dashboard.emailjs.com)
2. Sign up or log in
3. Create a new service (e.g., "Gmail")
4. Create an email template

#### Step 2: Create Email Template

In EmailJS dashboard:

1. Go to **Email Templates**
2. Create new template with these variables:
   ```html
   <h2>New Contact from {{from_name}}</h2>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Company:</strong> {{company}}</p>
   <p><strong>Service:</strong> {{service}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   ```

#### Step 3: Get Your Credentials

In EmailJS dashboard, find:
- **Service ID** (e.g., `service_xxxxxxxxxxxxx`)
- **Template ID** (e.g., `template_xxxxxxxxxxxxx`)
- **Public Key** (in Account settings)

#### Step 4: Update Environment Variables

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=publicKey_xxxxxxxxxxxxx
```

### Form Field Mapping

The form fields automatically map to EmailJS template variables:

| Form Field | Template Variable |
|-----------|------------------|
| Name | `{{from_name}}` |
| Email | `{{from_email}}` |
| Company | `{{company}}` |
| Service | `{{service}}` |
| Message | `{{message}}` |

### How It Works

1. User fills out the contact form
2. Form validates input locally
3. Submits to EmailJS (if configured) or Next.js API
4. Loading spinner shows during submission
5. Success/error message displayed
6. GA4 event tracked

### Code Example

```jsx
import emailjs from '@emailjs/browser';

// Initialize (done in useEffect)
useEffect(() => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}, []);

// Send form
const result = await emailjs.sendForm(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  formRef.current
);
```

---

## Task 3: Google Analytics 4

### Overview

Track user engagement, form submissions, button clicks, and portfolio views.

### Files

- **`pages/_app.js`** - GA4 script initialization and route tracking
- **`pages/_document.js`** - Global document shell and theme metadata
- **`pages/index.jsx`** - Page-level SEO metadata
- **`lib/ga4-analytics.js`** - Event tracking utilities
- **`lib/usePageViewTracking.js`** - Page view tracking hook

### Setup Instructions

#### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property
3. Select "Web" platform
4. Get your **Measurement ID** (G-XXXXXXXXXX)

#### Step 2: Update Environment Variables

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 3: Verify GA4 is Active

In `pages/_app.js`, GA4 script will automatically load if `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set.

### Event Tracking

The form automatically tracks these GA4 events:

#### 1. CTA Button Clicks
```javascript
trackCTAClick('Contact Form', 'Hero Section');
// Parameters: buttonText, location
```

#### 2. Form Submissions
```javascript
trackFormSubmission('contact_form', 'web-development');
// Parameters: formName, service
```

#### 3. Portfolio Card Views
```javascript
trackPortfolioCardView('E-commerce Platform', 'web-development');
// Parameters: cardTitle, cardCategory
```

### Available Tracking Functions

Import from `lib/ga4-analytics.js`:

```javascript
import {
  trackPageView,         // Track page views
  trackEvent,            // Custom events
  trackCTAClick,         // CTA button clicks
  trackFormSubmission,   // Form submissions
  trackPortfolioCardView, // Portfolio card views
  trackServiceView,      // Service section views
  trackScrollDepth,      // Scroll depth
  trackExternalLink,     // External links
  trackError,            // Error events
} from '@/lib/ga4-analytics';
```

### Usage in Components

```jsx
import { trackCTAClick } from '@/lib/ga4-analytics';

export default function HeroSection() {
  return (
    <button
      onClick={() => {
        trackCTAClick('Get Started', 'Hero');
        // Navigate or perform action
      }}
    >
      Get Started
    </button>
  );
}
```

### GA4 Dashboard

In Google Analytics, view:
- **Real-time** users and events
- **Engagement** metrics (page views, sessions)
- **Conversions** (form submissions)
- **User journey** from first click to conversion

---

## Task 4: SEO Meta Tags

### Overview

Enhanced SEO with Open Graph tags, Twitter cards, and canonical URLs for better search rankings and social sharing.

### Files Updated

- **`pages/index.jsx`** - Comprehensive metadata
- **`pages/_document.js`** - Base document and theme metadata

### Meta Tags Included

#### Basic SEO
```jsx
title: 'Outpro.India - Premium Digital Agency | Web Development & Design'
description: 'Transform your vision...'
keywords: 'web development, mobile apps, ...'
robots: { index: true, follow: true }
canonical: 'https://outpro.india'
```

#### Open Graph Tags (Social Sharing)
```jsx
openGraph: {
  title: 'Outpro.India - Premium Digital Agency',
  description: '...',
  url: 'https://outpro.india',
  images: [{ url: 'og-image.jpg', width: 1200, height: 630 }]
}
```

#### Twitter Card Tags
```jsx
twitter: {
  card: 'summary_large_image',
  title: 'Outpro.India - Premium Digital Agency',
  images: ['og-image.jpg'],
  creator: '@OutproIndia'
}
```

#### Security Headers
- **X-Frame-Options**: SAMEORIGIN (prevent clickjacking)
- **X-Content-Type-Options**: nosniff (prevent MIME sniffing)
- **X-XSS-Protection**: 1; mode=block (XSS protection)

### Setup Steps

1. **Custom OG Image**
  - Create 1200x630px image
  - Place at `/public/og-image.jpg`
  - Update `openGraph.images` in `pages/index.jsx`

2. **Canonical URL**
   - Already set to `NEXT_PUBLIC_SITE_URL`
   - Update `.env`:
     ```env
     NEXT_PUBLIC_SITE_URL=https://outpro.india
     ```

3. **Verification**
   - Google Search Console: Add verification code
   - Yandex Webmaster: Add verification code

### Testing SEO Tags

**Online Tools:**
- [Meta Tags Preview](https://metatags.io)
- [Open Graph Preview](https://www.opengraph.xyz)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Task 5: Performance Optimization

### Overview

Optimized Next.js configuration for faster load times and better Core Web Vitals.

### Files Updated

- **`next.config.js`** - Comprehensive performance settings

### Optimizations Included

#### 1. Image Optimization
```javascript
// Automatic WebP/AVIF conversion
formats: ['image/webp', 'image/avif']

// Responsive image sizes
sizes: [
  '(max-width: 640px) 100vw',
  '(max-width: 1024px) 80vw',
  '40vw'
]

// 1-year caching for optimized images
minimumCacheTTL: 60 * 60 * 24 * 365
```

#### 2. Asset Caching
```javascript
// Cache static assets for 1 year
Cache-Control: public, max-age=31536000, immutable

// Applies to:
// - /static/** (1 year)
// - /images/** (1 year)
// - /*.woff2 fonts (1 year)
```

#### 3. Compression
```javascript
compress: true  // Enable gzip/brotli compression
```

#### 4. Bundle Size Optimization
```javascript
// Webpack optimization
splitChunks: {
  vendors: { filename: 'chunks/vendor.js' }
}
```

#### 5. Security Headers
- DNS Prefetch Control
- Frame Options (prevent clickjacking)
- Content Type Sniffing (prevent MIME sniffing)
- XSS Protection
- Referrer Policy

### Performance Metrics

These optimizations improve:
- ⚡ **Largest Contentful Paint (LCP)** - < 2.5s
- 🎯 **Cumulative Layout Shift (CLS)** - < 0.1
- ⏱️ **First Input Delay (FID)** - < 100ms

### Testing Performance

```bash
# Build and analyze bundle
npm run build

# Run Next.js in production
NODE_ENV=production npm run start

# Use Chrome DevTools Lighthouse for Core Web Vitals
```

---

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SEND_CONFIRMATION_EMAIL=true
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=publicKey_xxx
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://outpro.india
```

---

## Running the Application

### Development

**Terminal 1 - Backend Server:**
```bash
node server.js
# or for auto-reload
npm install -g nodemon
nodemon server.js
```

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Production

**Build:**
```bash
npm run build
npm run start
```

**Deploy:**
- Frontend: Vercel (preferred for Next.js)
- Backend: Heroku, AWS, DigitalOcean, Railway

---

## Troubleshooting

### Email Not Sending

- ❌ Check Gmail app password (not regular password)
- ❌ Verify `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- ❌ Check "Less secure app access" is disabled (use app password instead)
- ✅ Test with: `node server.js` and check console

### GA4 Not Tracking

- ❌ Verify `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in `.env.local`
- ❌ Check GA4 property is active in Google Analytics
- ❌ Open DevTools → Network tab → Look for `gtag.js` request
- ✅ Wait 24-48 hours for data to appear in GA4 dashboard

### EmailJS Not Sending

- ❌ Verify Service ID, Template ID, Public Key
- ❌ Check template has correct variable names
- ❌ Verify CORS settings in EmailJS dashboard
- ✅ Test in browser console: `emailjs.sendForm(...)`

### Performance Issues

- ❌ Check image sizes (should be < 100KB after optimization)
- ❌ Verify cache headers in DevTools
- ❌ Use Chrome Lighthouse to identify bottlenecks
- ✅ Run `npm run build` and analyze bundle

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Express.js Docs**: https://expressjs.com
- **Nodemailer**: https://nodemailer.com
- **EmailJS**: https://www.emailjs.com/docs
- **Google Analytics 4**: https://developers.google.com/analytics/devguides/collection/ga4
- **Next.js Image Optimization**: https://nextjs.org/docs/basic-features/image-optimization

---

**Last Updated**: March 31, 2024  
**Version**: 1.0.0
