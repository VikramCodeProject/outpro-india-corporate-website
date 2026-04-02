# 🚀 TASK 1: VERCEL DEPLOYMENT - Complete Guide

**Time to Complete**: 15 minutes  
**Difficulty**: ⭐⭐ Easy  
**Prerequisites**: GitHub account, domain (optional)

---

## 📋 Overview

Vercel is the easiest way to deploy Next.js applications. It offers:
- Automatic builds on every push
- Free SSL/HTTPS
- Custom domain support
- Preview deployments
- Built-in analytics
- Global CDN

---

## ✅ Step-by-Step Deployment

### STEP 1: Prepare Your GitHub Repository

**1a. Ensure .gitignore is correct:**

```gitignore
# .gitignore (should already have these)
node_modules/
.env
.env.local
.next/
out/
build/
*.log
.DS_Store
```

**1b. Verify .env files are NOT committed:**

```bash
# Check if .env is tracked
git ls-files | grep -E "\.env"

# If .env is listed, remove it
git rm --cached .env
git commit -m "Remove .env from tracking"
```

**1c. Push to GitHub:**

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

### STEP 2: Connect Repository to Vercel

**2a. Go to Vercel Website**

Visit: https://vercel.com

**2b. Sign Up / Log In**

- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel to access your repositories

**2c. Import Project**

1. Click "Add New..." → "Project"
2. Select "GitHub" as source
3. Search for your repository: "MMajorproject1" or "outpro-india"
4. Click "Import"

---

### STEP 3: Configure Build Settings

**3a. Project Settings Screen**

You'll see:
- **Project Name**: outpro-india (or auto-detected)
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: ./ (leave as default)

**3b. Build Settings**

```
Build Command:    next build
Output Directory: .next
Install Command:  npm install
```

✅ These should be auto-detected. Click "Deploy" if ready.

**_OR_ Configure Manually:**

If using `vercel.json`:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

---

### STEP 4: Set Environment Variables in Vercel Dashboard

Once deployed, click "Settings" → "Environment Variables"

Add these variables:

```
Frontend Variables (public):
├─ NEXT_PUBLIC_GA4_MEASUREMENT_ID    G-XXXXXXXXXX
├─ NEXT_PUBLIC_SITE_URL              https://outpro.india
├─ NEXT_PUBLIC_EMAILJS_SERVICE_ID    service_xxxxx (optional)
├─ NEXT_PUBLIC_EMAILJS_TEMPLATE_ID   template_xxxxx (optional)
└─ NEXT_PUBLIC_EMAILJS_PUBLIC_KEY    publicKey_xxxxx (optional)
```

**Steps:**

1. Go to **Settings** → **Environment Variables**
2. For each variable:
   - Variable Name: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`
   - Select all environments (Production, Preview, Development)
   - Click "Save"

3. Repeat for all public variables

**Important:** 
- ✅ All frontend variables MUST start with `NEXT_PUBLIC_`
- ✅ They are safe to expose (used in browser)
- ✅ No secrets go in frontend (email passwords, etc.)

---

### STEP 5: Configure Custom Domain (Optional)

**5a. If you have a custom domain:**

1. Go to **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain: `outpro.india`
4. Choose one option:

**Option A: Change Nameservers (Recommended)**
- Update DNS at your registrar
- Point nameservers to Vercel's:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- Takes 24-48 hours to propagate
- Vercel manages all DNS records

**Option B: Add CNAME Record (Faster)**
- Add CNAME record at registrar:
  - Name: `www` (or subdomain)
  - Value: `cname.vercel-dns.com`
  - Takes 5-15 minutes

**5b. Verify Domain**

Once configured, Vercel shows:
```
✅ outpro.india
   SSL Certificate: Valid (auto-renewed)
```

**5c. (Optional) Set Primary Domain**

In Domains section, click three dots on a domain → "Set as Primary"

This redirects other domains to the primary domain.

---

### STEP 6: Verify SSL/HTTPS is Active

**6a. In Vercel Dashboard:**

Go to **Settings** → **Domains**

Look for:
```
✅ outpro.india
   Valid Certificate  (shows green)
   Auto-renewal: ON   (managed by Let's Encrypt)
```

**6b. Test in Browser:**

```
Visit: https://outpro.india

Browser shows:
✅ Green lock icon (HTTPS active)
✅ No warnings
```

**6c. Verify Certificate Details:**

```bash
# In terminal, check SSL cert
openssl s_client -servername outpro.india -connect outpro.india:443 < /dev/null

# Should show:
Verify return code: 0 (ok)
```

---

### STEP 7: Setup Preview Deployments

Preview deployments are **automatic**. Every pull request gets a preview URL.

**7a. How it Works:**

1. Create a pull request on GitHub
2. Vercel automatically builds & deploys preview
3. Shows comment on PR with preview URL
4. Test changes before merging

**Example:**
```
Preview URL: https://mmajorproject1-preview-abc123.vercel.app
```

**7b. Configuration:**

No setup needed! Preview deployments are enabled by default.

**Optional: Configure Preview Settings**

Go to **Settings** → **Git** → **Preview Deployments**

Options:
- ```
  Include/Exclude Branches
  Preview Drafts
  Ignore Build Step
  ```

**7c. Test Preview Deployments:**

1. Create a new branch:
   ```bash
   git checkout -b feature/test-preview
   ```

2. Make a small change:
   ```bash
   echo "<!-- Preview test -->" >> README.md
   ```

3. Push and create PR:
   ```bash
   git push origin feature/test-preview
   ```

4. On GitHub, Vercel shows preview link

5. Click link to verify preview works

---

## 🧪 Verify Deployment Success

### Test 1: Website Loads

```bash
# Should return 200
curl -I https://outpro.india

# Output should show:
HTTP/2 200
```

### Test 2: All Pages Load

```bash
# Test main pages
curl -I https://outpro.india
curl -I https://outpro.india/contact
curl -I https://outpro.india/services

# All should return 200
```

### Test 3: Environment Variables Work

In browser console, check:
```javascript
// Should show your Measurement ID
window.__NEXT_DATA__.props.pageProps.GA_ID
```

### Test 4: Static Assets Load

```bash
# Check if images load
curl -I https://outpro.india/_next/image?url=...

# Should return 200
```

### Test 5: API Routes Work

```bash
# If using Next.js API routes
curl https://outpro.india/api/contact \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'

# Should return valid response
```

---

## 🔧 Deployment Settings Reference

### Settings → General

```
Framework: Next.js
Build Command: next build
Output Directory: .next
Node Version: 18.x (recommended)
NPM Version: 9.x (auto)
```

### Settings → Integrations

```
✅ GitHub (already connected)
Connect other services if needed
```

### Deployment Strategy

```
Auto Deploy: ON
Automatic Production Deployments: ON
Preview Deployments: ON
```

---

## 📊 Monitor Deployments

### View Deployment History

1. Click **Deployments** tab
2. Shows all deployments chronologically:
   - Timestamp
   - Status (Ready, Building, Error)
   - Branch
   - Commit message

### Check Build Logs

1. Click on a deployment
2. Click **Logs** to see:
   - Install logs (npm install)
   - Build logs (next build)
   - Deployment logs

### View Real-time Analytics

1. Click **Analytics** tab
2. Shows:
   - Page views
   - Response times
   - Error rates
   - Geographic distribution

---

## 🐛 Troubleshooting

### Build Fails

```
Error: "next build" failed

Fix:
1. Check build logs in Vercel dashboard
2. Review error message
3. Common causes:
   - Missing environment variables
   - Syntax errors in code
   - Missing dependencies in package.json

Solution:
1. Fix locally: npm run build
2. Commit and push
3. Vercel auto-rebuilds
```

### Environment Variables Not Working

```
Error: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID is undefined

Fix:
1. Verify variable is in Vercel dashboard
2. Ensure it starts with NEXT_PUBLIC_
3. Redeploy after adding:
   - Trigger: git push origin main
   - OR click "Redeploy"
```

### Domain Not Working

```
Error: Domain not connecting after 24 hours

Fix:
1. Verify DNS settings at registrar
2. Wait 48 hours max
3. Check: https://dns.google/
4. Search for your domain
5. Should show Vercel's nameservers
```

### SSL Certificate Not Active

```
Error: HTTPS shows certificate error

Fix:
1. In Vercel: Settings → Domains
2. Refresh the page
3. Should show green checkmark
4. Takes up to 5 minutes after domain added

If still not working:
1. Wait 24 hours (Let's Encrypt can take time)
2. Or contact Vercel support
```

---

## 🎯 Common Tasks After Deployment

### Update Website After Launch

```bash
# Make changes locally
# ... edit files ...

# Commit and push
git add .
git commit -m "Update features"
git push origin main

# Vercel auto-deploys!
# Check Deployments tab for status
```

### Rollback to Previous Deployment

1. Go to **Deployments**
2. Find previous working deployment
3. Click three dots → **Promote to Production**
4. Done! Reverted to that version

### Manage Team Access

1. **Settings** → **Team**
2. Click **Add Member**
3. Enter email
4. Select permissions:
   - Admin
   - Member
   - Viewer

### Setup Deployment Protection

1. **Settings** → **Deployment Protection**
2. Require password for production deployments
3. Only specified people can deploy

---

## 📋 Verification Checklist

```
✅ Repository connected to Vercel
✅ Environment variables configured
✅ Custom domain added (if applicable)
✅ SSL certificate active (green lock)
✅ Build succeeds (0 errors)
✅ Website loads at https://domain.com
✅ All pages accessible (no 404s)
✅ Images load correctly
✅ Forms submit successfully
✅ GA4 tracking active
✅ Contact form backend working
✅ Preview deployments functional
```

---

## 📞 Helpful Links

| Resource | URL |
|----------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Next.js Deployment | https://nextjs.org/docs/deployment |
| Vercel Documentation | https://vercel.com/docs |
| Vercel Support | https://vercel.com/support |
| DNS Checker | https://dns.google/ |

---

**Estimated Time**: 15 minutes  
**Cost**: FREE ✅  
**Status**: ✅ READY FOR PRODUCTION

Your Next.js website is now live on Vercel with automatic deployments, SSL, and global CDN!
