# Outpro.India Production Rollout Runbook

This is a zero-guess, end-to-end deployment sequence for this repository.

## 0. Preflight On Local Machine

1. Open PowerShell in project root.
2. Verify branch and pull latest:

   git checkout main
   git pull origin main

3. Install dependencies:

   npm install

4. Build and confirm local production build passes:

   npm run build

5. Optional local API sanity test (if backend running):

   npm run server
   npm run test:contact-api

## 1. Frontend Deployment To Vercel

1. Go to Vercel Dashboard.
2. Add New Project and import this GitHub repo:
   https://github.com/VikramCodeProject/outpro-india-corporate-website
3. Framework preset should be Next.js.
4. Use these settings:
   - Build Command: next build
   - Output Directory: .next
   - Install Command: npm install
5. Add production environment variables in Vercel Project Settings:
   - NEXT_PUBLIC_SITE_URL=https://your-domain.com
   - NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   - NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx (if using EmailJS)
   - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx (if using EmailJS)
   - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=publicKey_xxxxx (if using EmailJS)
6. Trigger deploy.
7. Verify Vercel production URL opens successfully.

## 2. Backend Deployment To Render (Free Tier)

1. Go to Render Dashboard.
2. Create New Web Service.
3. Connect same GitHub repository.
4. Configure service:
   - Runtime: Node
   - Build Command: npm install
   - Start Command: node server.js
   - Branch: main
5. Add environment variables in Render:
   - EMAIL_SERVICE=gmail
   - EMAIL_USER=your-email@gmail.com
   - EMAIL_PASSWORD=your-app-password
   - FRONTEND_URL=https://your-domain.com
   - NODE_ENV=production
   - SEND_CONFIRMATION_EMAIL=true
6. Deploy and wait for green status.
7. Verify health endpoint:

   https://your-render-service.onrender.com/api/health

## 3. Frontend API URL Wiring

Use one of these patterns:

1. If frontend should call Render directly, set in Vercel:
   - NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com

2. If frontend continues with Next API route path, keep form target as /api/contact and ensure hosting path is correct.

After changing environment variables in Vercel, redeploy.

## 4. Custom Domain + SSL

### Vercel

1. Project Settings -> Domains.
2. Add root domain and www if needed.
3. Add DNS records as instructed by Vercel.
4. Confirm certificate status is Valid.

### Cloudflare (Optional CDN Front)

1. Create Cloudflare free account.
2. Add your domain.
3. Update nameservers at registrar to Cloudflare nameservers.
4. In Cloudflare DNS, verify records point correctly to Vercel.
5. SSL/TLS mode: Full (strict).
6. Enable Always Use HTTPS.
7. Enable Auto Minify:
   - HTML On
   - CSS On
   - JS On
8. Add cache rules:
   - Cache static assets aggressively.
   - Exclude dynamic/API paths from aggressive cache.

## 5. Performance Hardening Sequence

1. Confirm all content images use Next Image component.
2. Keep above-the-fold hero image as priority only where needed.
3. Keep below-the-fold media lazy-loaded.
4. Keep fonts with swap behavior.
5. Keep analytics scripts loaded after interactive.
6. Keep cache headers active in Next config.
7. Rebuild and retest:

   npm run build

8. Run Lighthouse and PageSpeed on production URL:
   - Mobile target: 90+
   - Desktop target: 95+

## 6. End-To-End Validation Before Go-Live

1. Link check:
   - Home, section anchors, footer links, legal links.
   - No 404 responses.

2. Contact pipeline check:
   - Submit form from live site.
   - Confirm API success response.
   - Confirm inbox delivery.

3. Device check:
   - 375 width
   - 768 width
   - 1440 width

4. Security check:
   - HTTPS lock icon present.
   - SSL certificate valid.
   - Security headers visible in response.

5. Analytics check:
   - Open GA4 Realtime.
   - Trigger page_view, CTA click, form submit.
   - Confirm events appear.

## 7. Release Command Sequence (Local)

When you are ready to publish updates:

1. git checkout main
2. git pull origin main
3. npm install
4. npm run build
5. git add -A
6. git commit -m Deploy prep updates
7. git push origin main

Vercel and Render will auto-deploy from main if connected.

## 8. Rollback Plan

1. Vercel: Promote previous successful deployment.
2. Render: Redeploy previous stable commit.
3. Cloudflare: Temporarily disable aggressive cache rules if stale content appears.
4. Keep a note of last stable commit hash before each major release.

## 9. Useful Project Scripts

- npm run dev
- npm run build
- npm run start
- npm run server
- npm run validate-env
- npm run test:contact-api
- npm run test:api:script
- npm run checklist:deploy

## 10. Fast Checklist

- Frontend live on Vercel
- Backend live on Render
- Environment variables set on both platforms
- Domain connected and HTTPS valid
- PageSpeed targets met
- Contact form verified live
- GA4 realtime verified
- Rollback path verified
