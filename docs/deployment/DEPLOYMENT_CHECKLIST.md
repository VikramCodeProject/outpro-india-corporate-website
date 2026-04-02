# Outpro.India Pre-Launch Deployment Checklist

Use this checklist before launching the site to production. It matches the automated checks in [deployment-checklist.sh](../../scripts/deployment-checklist.sh) and adds the manual verification steps that still need a human review.

## 1. Frontend Readiness

- [ ] `npm run build` completes without errors.
- [ ] The site renders correctly on the homepage.
- [ ] Navigation links scroll to the right sections.
- [ ] The contact form is visible and usable.
- [ ] Mobile layout works at 375px, 768px, and desktop widths.
- [ ] No console errors appear on first load.

## 2. Backend Readiness

- [ ] `node server.js` starts successfully in development.
- [ ] `GET /api/health` returns `200`.
- [ ] `POST /api/contact` accepts valid submissions.
- [ ] Invalid submissions return `400` with a useful message.
- [ ] Email delivery reaches `hello@outpro.india`.
- [ ] CORS only allows the production frontend domain.

## 3. EmailJS Readiness

- [ ] `@emailjs/browser` is installed.
- [ ] `NEXT_PUBLIC_EMAILJS_SERVICE_ID` is set if EmailJS is enabled.
- [ ] `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` is set if EmailJS is enabled.
- [ ] `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is set if EmailJS is enabled.
- [ ] The template variables match the form fields exactly.

## 4. GA4 Readiness

- [ ] `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set.
- [ ] The GA4 script loads in the browser network tab.
- [ ] Page views are visible in GA4 Realtime.
- [ ] CTA click tracking fires from the hero buttons.
- [ ] Form submission events fire after a successful submit.
- [ ] Portfolio card view events fire when cards enter view.

## 5. SEO Readiness

- [ ] The homepage has a descriptive `<title>`.
- [ ] A canonical URL points to the production site.
- [ ] Open Graph tags are present.
- [ ] Twitter card tags are present.
- [ ] `robots` allows indexing and following.
- [ ] The OG image exists at `/public/og-image.jpg`.

## 6. Performance Readiness

- [ ] `next/image` is used for images that should be optimized.
- [ ] Below-the-fold images are lazy loaded.
- [ ] Fonts use `display=swap` or equivalent.
- [ ] Static assets are cached for 1 year.
- [ ] Compression is enabled in `next.config.js`.
- [ ] Lighthouse performance is 90+ on mobile or close to it.

## 7. Security Readiness

- [ ] `.env` is not committed.
- [ ] Secrets are only stored in environment variables.
- [ ] Gmail app password is used instead of the main password.
- [ ] Input sanitization is active on the backend.
- [ ] Security headers are present in production responses.
- [ ] The site only redirects over HTTPS.

## 8. Deployment Platform Checks

### Vercel

- [ ] Repository is connected to Vercel.
- [ ] Build command is `next build`.
- [ ] Output directory is `.next`.
- [ ] Production environment variables are configured.
- [ ] Custom domain is active, if used.
- [ ] SSL certificate is valid.

### Render

- [ ] Web service is created.
- [ ] Start command is `node server.js`.
- [ ] Render environment variables are configured.
- [ ] Backend logs show no errors.
- [ ] The health endpoint is reachable on the Render URL.

### Cloudflare

- [ ] Domain nameservers point to Cloudflare.
- [ ] DNS records are proxied where appropriate.
- [ ] SSL/TLS mode is `Full` or `Full (strict)`.
- [ ] Cache rules are configured.
- [ ] Auto Minify is enabled if desired.

## 9. Final Launch Sign-Off

- [ ] Contact form tested from the live domain.
- [ ] Email received by the team inbox.
- [ ] GA4 realtime shows a visit from the live site.
- [ ] The site loads over HTTPS with no browser warnings.
- [ ] The checklist script passes with zero critical failures.

## 10. Last-Minute Rollback Plan

- [ ] Keep the previous Vercel deployment available.
- [ ] Keep the Render service running until launch is stable.
- [ ] Document the last working commit hash.
- [ ] Know how to revert DNS changes if needed.

## Notes

- Use [deployment-checklist.sh](../../scripts/deployment-checklist.sh) for the automated checks.
- Run the shell script on the same machine that has network access to the deployed site.
- Treat warnings as items to review before launch.
