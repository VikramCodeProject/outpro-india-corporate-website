# 🚀 TASK 2: BACKEND DEPLOYMENT ON RENDER - Complete Guide

**Time to Complete**: 15 minutes  
**Difficulty**: ⭐⭐ Easy  
**Cost**: FREE ✅ (with generous free tier limits)  
**Prerequisites**: GitHub account

---

## 📋 Overview

Render is a modern deployment platform perfect for Node.js/Express servers:
- Free tier with generous limits
- Easy GitHub integration
- Automatic deployments
- Environment variables management
- Custom domains
- 750 hours/month free compute

---

## ✅ Step-by-Step Backend Deployment

### STEP 1: Verify Backend Code is Ready

**1a. Confirm server.js exists:**

```bash
ls -la server.js
# Output: server.js exists (194 lines)
```

**1b. Test locally:**

```bash
# Make sure email env vars are set
export EMAIL_USER="your-email@gmail.com"
export EMAIL_PASSWORD="your-app-password"

# Start server
node server.js

# Should show:
# 🚀 Outpro.India Backend Server
# 📡 Server running at http://localhost:5000
# ✉️  Email Service: gmail
```

**1c. Stop local server:**

```bash
Ctrl+C
```

**1d. Commit server.js to GitHub:**

```bash
git status
# Should show server.js tracked

git add .
git commit -m "Add Express backend for deployment"
git push origin main
```

---

### STEP 2: Create Render Web Service

**2a. Go to Render Website**

Visit: https://render.com

**2b. Sign Up / Log In**

- Click "Get Started"
- Choose "Continue with GitHub"
- Authorize Render to access repositories
- Select your organization (or personal account)

**2c. Create New Web Service**

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect a repository"**

**2d. Connect GitHub Repository**

1. If not visible: click **"+ Connect account"**
2. Search for: **MMajorproject1** (your repo name)
3. Click repository name
4. Click **"Connect"**

---

### STEP 3: Configure Web Service

**3a. Basic Settings**

Fill in these fields:

```
Name:              outpro-india-backend
  (or auto-generated, e.g., mmajorproject1-5m9k)

Environment:       Node
Region:            Ohio (us-east-1) or closest to users
Branch:            main
Build Command:     npm install
Start Command:     node server.js
```

**3b. Plan Selection**

```
SELECT: Free
└─ 750 hours/month (plenty for a backend)
   $0/month
```

Click **"Create Web Service"**

⏳ First deploy takes 2-3 minutes...

---

### STEP 4: Set Environment Variables

Once the service is created:

**4a. In Render Dashboard**

1. Your service appears
2. Click service name to open it
3. Go to **"Environment"** tab

**4b. Add Environment Variables**

Click **"Add Environment Variable"** for each:

```
EMAIL_SERVICE     = gmail
EMAIL_USER        = your-email@gmail.com
EMAIL_PASSWORD    = xxxx xxxx xxxx xxxx (your 16-char app password)
PORT              = 5000
NODE_ENV          = production
FRONTEND_URL      = https://outpro.india
SEND_CONFIRMATION_EMAIL = true
```

**Steps for each variable:**

1. Under **"Environment"** section
2. Click **"Add Environment Variable"**
3. Enter:
   - Key: `EMAIL_USER`
   - Value: `your-email@gmail.com`
4. Click **"Save Changes"**
5. Repeat for all variables

**Important:**
- ✅ EMAIL_PASSWORD must be your 16-character Gmail app password
- ✅ Choose "Production" environment
- ❌ Never hardcode in code

**4c. Variables Added**

After adding all, Render shows:
```
Environment Variables:
├─ EMAIL_SERVICE = gmail
├─ EMAIL_USER = your-email@gmail.com
├─ EMAIL_PASSWORD = ••••••••••••••••
├─ PORT = 5000
├─ NODE_ENV = production
├─ FRONTEND_URL = https://outpro.india
└─ SEND_CONFIRMATION_EMAIL = true
```

**4d. Deploy with New Variables**

- Click **"Manual Deploy"** → **"Deploy latest commit"**
- Service redeploys with environment variables
- Takes 1-2 minutes

---

### STEP 5: Verify Backend is Running

**5a. Get Service URL**

In Render dashboard:

```
Your service page shows:
📍 URL: https://outpro-india-backend-abc1.onrender.com
```

Copy this URL (your Render backend URL)

**5b. Test Health Endpoint**

```bash
# Replace with your actual URL
curl https://outpro-india-backend-abc1.onrender.com/api/health

# Should return:
{
  "status": "ok",
  "message": "Server is running"
}
```

**5c. Test Contact API**

```bash
curl -X POST https://outpro-india-backend-abc1.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "service": "web-development",
    "message": "Testing backend deployment"
  }'

# Should return:
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "submittedAt": "2024-03-31T10:30:00.000Z",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**5d. Check Email Received**

Check your email at `hello@outpro.india` (or configured email)

Should have received test email with:
```
To: hello@outpro.india
From: your-email@gmail.com
Subject: 🎯 New Contact: Test User
```

---

### STEP 6: Update Frontend to Use Render Backend

**6a. Update Next.js API Route**

In `pages/api/contact.js`, the form can use either:
- Render backend URL (production)
- Next.js API route (alternative)

**Option A: Use Render Backend**

Frontend automatically tries Render first if configured.

Update `components/ContactForm.jsx`:

```javascript
// Comment out the LOCAL API call
// const response = await fetch('/api/contact', {

// Use Render backend instead
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
                'https://outpro-india-backend-abc1.onrender.com';

const response = await fetch(`${API_URL}/api/contact`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({...})
});
```

**Option B: Use Next.js API Route** (Easier)

Already configured to use `/api/contact` which Vercel handles.

No changes needed if using Vercel for both.

**6b. If Using Render Backend**

Update `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://outpro-india-backend-abc1.onrender.com
```

**6c. Redeploy Frontend on Vercel**

```bash
git add .
git commit -m "Update to use Render backend"
git push origin main
```

Vercel automatically redeploys.

---

### STEP 7: Test End-to-End

**7a. Test from Frontend**

1. Visit your Vercel website: `https://outpro.india`
2. Fill contact form
3. Submit
4. Should see success message
5. Check email at hello@outpro.india

**7b. Test Error Handling**

Try submitting with errors:
- Missing email → Error message
- Invalid email → Validation error
- Empty message → Required field error

**7c. Monitor Render Logs**

In Render dashboard:

1. Click your service
2. Go to **"Logs"** tab
3. Should see:
   ```
   Server running at http://localhost:5000
   Email service is ready
   POST /api/contact - 200 OK
   Email sent to hello@outpro.india
   ```

---

## 🔧 Configuration Reference

### Start Command Options

Render detects package.json scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "server": "node server.js"
  }
}
```

Render will use the start command found.

If not found, specify in Render:
```
Start Command: node server.js
```

### Build Command

```
Build Command: npm install

(Render runs this before start)
```

### Environment Variables Priority

```
Render Environment Variables (highest priority)
↑
├─ Used by server.js
├─ Required: EMAIL_USER, EMAIL_PASSWORD
└─ Optional: NODE_ENV, PORT, etc.
```

---

## 🌐 Custom Domain for Backend (Optional)

If you want a custom domain for the backend API:

**Settings → Custom Domain**

```
1. Click "Add Custom Domain"
2. Enter: api.outpro.india
3. Copy CNAME record shown
4. Add to your domain DNS:
   Name: api
   Type: CNAME
   Value: cname.onrender.com
5. Takes 5-30 minutes to activate
```

Update frontend to use:
```env
NEXT_PUBLIC_API_URL=https://api.outpro.india
```

---

## 🧪 Testing Checklist

### Automated Tests

```bash
# Test health
curl https://outpro-india-backend-abc1.onrender.com/api/health

# Test valid submission
curl -X POST https://outpro-india-backend-abc1.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","company":"Corp","service":"web","message":"Test"}'

# Test validation (missing fields should fail)
curl -X POST https://outpro-india-backend-abc1.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
```

### Manual Tests

```
✅ Health endpoint returns 200
✅ Form submission returns 200 + success: true
✅ Validation errors return 400
✅ Invalid email returns 400
✅ Email received at hello@outpro.india
✅ Logs show successful requests
✅ No error messages in logs
```

---

## 🐛 Troubleshooting

### Deployment Fails

```
Build failed: npm install failed

Fix:
1. Check package.json has all dependencies
2. Node version might be incompatible
3. In Render settings, set Node version:
   Environment → Node Version: 18.x
4. Click "Manual Deploy"
```

### Server Won't Start

```
Error: Cannot find module 'express'

Fix:
1. Ensure package.json has all dependencies:
   - express
   - nodemailer
   - cors
   - dotenv
2. Run: npm install
3. Commit: git push
4. Render redeploys
```

### Email Not Sending

```
Error: Email service failed

Fix:
1. Check environment variables in Render dashboard
2. EMAIL_USER & EMAIL_PASSWORD must be correct
3. PASSWORD must be 16-char app password (not main password)
4. Test locally: node server.js
5. Check logs in Render dashboard
```

### CORS Errors

```
Error: Access-Control-Allow-Origin error

Fix:
1. Check FRONTEND_URL in environment variables
2. Must exactly match your Vercel URL
3. Example: https://outpro.india (with https://)
4. Verify in server.js CORS config:
   origin: process.env.FRONTEND_URL
5. Redeploy: Manual Deploy
```

### Connection Timeout

```
Error: Service unreachable

Fix:
1. Service might be sleeping (free tier spins down after 15 min inactivity)
2. Reload service: Click "Manual Restart"
3. Wait 30 seconds for startup
4. Try request again
5. After first request, stays awake for 15 min
```

---

## 📊 Monitor and Maintain

### View Logs

**In Render dashboard:**

1. Click your service
2. Go to **"Logs"** tab
3. Shows real-time logs:
   ```
   Mar 31 10:30:00 Server running at http://localhost:5000
   Mar 31 10:30:15 Email service is ready
   Mar 31 10:35:20 POST /api/contact 200 45ms
   Mar 31 10:35:21 Email sent to hello@outpro.india
   ```

### Restart Service

```
If service is stuck:
1. Go to "Dashboard" tab
2. Click "Restart service"
3. Service restarts in 10 seconds
```

### Manual Deployment

```
To redeploy without code changes:
1. Click "Manual Deploy"
2. Select "Deploy latest commit"
3. Service rebuilds and restarts
```

### Update Dependencies

```bash
# If you upgrade packages
npm install new-package

# Commit changes
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main

# Render auto-redeploys with npm install
```

---

## 🔐 Security Best Practices

### 1. Use App Password

```
❌ DON'T: Use your main Gmail password
✅ DO: Use 16-character app password from:
  https://myaccount.google.com/apppasswords
```

### 2. Keep Secrets Safe

```
❌ DON'T: Hardcode secrets in code
✅ DO: Use Render environment variables
```

### 3. Limit CORS

```javascript
// In server.js
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Only allow your frontend
  credentials: true,
};
```

### 4. Validate Input

```
✅ server.js validates all inputs
✅ Sanitizes HTML tags
✅ Validates email format
✅ Checks required fields
```

---

## 📋 Deployment Checklist

```
✅ server.js committed to GitHub
✅ Web Service created on Render
✅ Environment variables configured
✅ Start command: node server.js
✅ Service is running (no errors)
✅ Health endpoint responds (HTTP 200)
✅ Contact endpoint works (HTTP 200)
✅ Email received test
✅ Error handling tested
✅ Logs are clean (no errors)
✅ Frontend URL configured for CORS
✅ Frontend pointing to Render URL (or using Next.js API)
```

---

## 📞 Helpful Links

| Resource | URL |
|----------|-----|
| Render Dashboard | https://dashboard.render.com |
| Render Docs | https://render.com/docs |
| Node.js on Render | https://render.com/docs/deploy-node-express-app |
| Environment Variables | https://render.com/docs/environment-variables |
| Gmail App Passwords | https://myaccount.google.com/apppasswords |

---

## 💰 Cost Breakdown

**Render Free Tier:**
```
750 compute hours/month × 0 nodes = $0
(Enough for ~1 small service)

Estimated usage:
- Backend service: 30-50 hours/month (active)
- Cost: $0/month ✅

When you need upgrades:
- Starter plan: $7/month (better performance)
- Pro plan: $12/month (advanced features)
```

---

**Estimated Time**: 15 minutes  
**Cost**: FREE ✅  
**Status**: ✅ READY FOR PRODUCTION

Your Node.js backend is now live on Render with automatic deployments!
