# 🚀 Outpro.India Backend Integration - Quick Start

Complete step-by-step guide to get everything running in 10 minutes.

## Prerequisites

- Node.js 16+ installed
- npm or yarn
- Gmail account (for email notifications)

## 1️⃣ Install Dependencies (1 minute)

```bash
npm install
```

## 2️⃣ Setup Environment Variables (2 minutes)

Copy the example file:
```bash
cp .env.example .env
```

### Get Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Windows Computer** (or your device)
3. Google will generate a 16-character password
4. Copy it

### Update .env File

Open `.env` and update:

```env
# Gmail Settings
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # 16-character app password

# CORS for frontend
FRONTEND_URL=http://localhost:3000

# Other settings
PORT=5000
NODE_ENV=development
```

## 3️⃣ Validate Environment (1 minute)

```bash
node scripts/validate-env.js
```

You should see:
```
✅ EMAIL_USER [BACKEND]
✅ EMAIL_PASSWORD [BACKEND]
✅ All required environment variables are configured!
```

## 4️⃣ Start Backend Server (1 minute)

```bash
node server.js
```

Expected output:
```
🚀 Outpro.India Backend Server
📡 Server running at http://localhost:5000
✉️  Email Service: gmail
🌐 CORS Origin: http://localhost:3000
```

## 5️⃣ Start Frontend (in new terminal)

```bash
npm run dev
```

Visit: **http://localhost:3000**

## 6️⃣ Test Contact Form

1. Open browser to http://localhost:3000
2. Navigate to contact form
3. Fill in the form:
   - Name: John Doe
   - Email: your-email@example.com
   - Company: Test Corp
   - Service: Web Development
   - Message: This is a test
4. Check the consent checkbox
5. Click "Send Message"

You should receive an email at `hello@outpro.india` (if configured).

## 🎯 Optional: Setup EmailJS (5 minutes)

Skip if using only backend email.

### Create EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up (free tier available)
3. Create service → Select "Gmail" → Authorize
4. Create template (see below)

### Create Email Template

Go to **Email Templates** → **Create New Template**

Template ID: `template_contact`

**Subject**: `🎯 New Contact: {{from_name}}`

**HTML Content**:
```html
<h2>New Contact from {{from_name}}</h2>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Service:</strong> {{service}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

### Get Credentials

1. Account Settings → Copy **Public Key**
2. Services → Copy **Service ID**
3. Templates → Copy **Template ID**

### Update .env

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_contact
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=publicKey_xxxxxxxxxxxxx
```

### Restart Frontend

```bash
npm run dev
```

## 📊 Optional: Setup Google Analytics 4 (3 minutes)

### Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property → Select "Web"
3. Enter website URL
4. Copy **Measurement ID** (G-XXXXXXXXXX)

### Update .env.local

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://outpro.india
```

### Verify GA4

1. Restart dev server: `npm run dev`
2. Open DevTools (F12) → Network tab
3. Search for `gtag.js` - should load
4. In GA4 dashboard, go to Real-time → should see your visitor

## 🧪 Test API Manually

### Using cURL

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "service": "web-development",
    "message": "I need a website"
  }'
```

### Expected Response

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

## 📝 View Logs

### Backend Logs

```bash
node server.js
# Watch for:
# - "Email service is ready to send"
# - "Server running at http://localhost:5000"
```

### Frontend in Console

Open DevTools (F12) → Console → Look for:
- "emailjs client initialized" (if EmailJS enabled)
- GA4 events (search for gtag)

## 🛠️ Troubleshooting

### Email Not Sending

```bash
# Is the server running?
curl http://localhost:5000

# Check .env has correct Gmail password
cat .env | grep EMAIL

# Make sure it's an app password, not your regular password
# Get new one: https://myaccount.google.com/apppasswords
```

### CORS Error

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Fix**: Make sure `FRONTEND_URL` in `.env` matches your frontend URL (default: http://localhost:3000)

### 502 Bad Gateway

Make sure backend server is running on correct port:
```bash
node server.js
# Should show: Server running at http://localhost:5000
```

## 📚 Full Documentation

For detailed setup, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## ✅ Checklist

- [ ] Node.js 16+ installed
- [ ] `npm install` completed
- [ ] `.env` file created and configured
- [ ] Gmail app password set in `.env`
- [ ] `node scripts/validate-env.js` shows success
- [ ] Backend running: `node server.js`
- [ ] Frontend running: `npm run dev`
- [ ] Can access http://localhost:3000
- [ ] Contact form submits successfully
- [ ] Email received at hello@outpro.india

---

## 🎉 Next Steps

1. **Test on Production Domain**
   - Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
   - Update `FRONTEND_URL` in backend `.env`

2. **Deploy Frontend**
   - Use Vercel (for Next.js)
   - Follow Vercel deployment guide

3. **Deploy Backend**
   - Use Heroku, Railway, or your hosting
   - Set environment variables on hosting platform

4. **Monitor Analytics**
   - Check GA4 dashboard for real-time data
   - View form submissions and user events

---

**Need Help?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed documentation.

**Last Updated**: March 31, 2024
