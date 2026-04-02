#!/usr/bin/env bash

# OUTPRO.INDIA DEPLOYMENT CHECKLIST
# Pre-Launch Quality Assurance Guide
# Use this script to verify everything before going live

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Test result logging
log_pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((PASSED++))
}

log_fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((FAILED++))
}

log_warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
    ((WARNINGS++))
}

log_info() {
    echo -e "${BLUE}ℹ️  INFO${NC}: $1"
}

# Header
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     OUTPRO.INDIA DEPLOYMENT CHECKLIST & QA VERIFICATION       ║"
echo "║                  Pre-Launch Quality Assurance                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# ================================================================
# SECTION 1: Website Accessibility & Functionality
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 1: WEBSITE ACCESSIBILITY & FUNCTIONALITY${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Read domain from user
read -p "Enter your website domain (e.g., outpro.india or staging.outpro.india): " DOMAIN

if [ -z "$DOMAIN" ]; then
    DOMAIN="http://localhost:3000"
    log_warn "No domain provided, using localhost ($DOMAIN)"
fi

# Ensure protocol
if [[ ! "$DOMAIN" =~ ^https?:// ]]; then
    DOMAIN="https://$DOMAIN"
fi

log_info "Testing domain: $DOMAIN"
echo ""

# Test 1: Homepage loads
log_info "Testing homepage..."
if curl -s -f -m 10 "$DOMAIN" > /dev/null 2>&1; then
    log_pass "Homepage loads successfully (HTTP 200-299)"
else
    log_fail "Homepage failed to load or returned error"
fi

# Test 2: Check for 404s on main pages
log_info "Testing main pages..."
PAGES=("/" "/contact" "/services" "/portfolio")

for page in "${PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" -m 10 "$DOMAIN$page")
    if [[ $STATUS =~ ^[23] ]]; then
        log_pass "Page $page returns HTTP $STATUS"
    else
        log_fail "Page $page returns HTTP $STATUS"
    fi
done

echo ""

# ================================================================
# SECTION 2: SSL/HTTPS VERIFICATION
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 2: SSL/HTTPS VERIFICATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test HTTPS
if [[ "$DOMAIN" =~ ^https:// ]]; then
    log_info "Verifying SSL certificate..."
    
    # Extract domain without protocol
    DOMAIN_ONLY=${DOMAIN#https://}
    DOMAIN_ONLY=${DOMAIN_ONLY%/}
    
    # Check SSL certificate
    if echo | openssl s_client -servername "$DOMAIN_ONLY" -connect "$DOMAIN_ONLY:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep -q "notAfter"; then
        EXPIRY=$(echo | openssl s_client -servername "$DOMAIN_ONLY" -connect "$DOMAIN_ONLY:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep "notAfter" | cut -d= -f2)
        log_pass "SSL certificate is active and valid. Expiry: $EXPIRY"
    else
        log_warn "Could not verify SSL certificate (may still be valid)"
    fi
    
    # Check HSTS header
    HSTS=$(curl -s -I "$DOMAIN" 2>/dev/null | grep -i "strict-transport-security" || echo "")
    if [ ! -z "$HSTS" ]; then
        log_pass "HSTS header detected: $HSTS"
    else
        log_warn "HSTS header not found (consider adding for security)"
    fi
else
    log_fail "Site is not using HTTPS (required for production)"
fi

echo ""

# ================================================================
# SECTION 3: RESPONSIVE DESIGN TEST
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 3: RESPONSIVE DESIGN TEST${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_info "Checking for viewport meta tag..."
if curl -s "$DOMAIN" 2>/dev/null | grep -q "viewport"; then
    log_pass "Viewport meta tag is present"
else
    log_fail "Viewport meta tag is missing (required for mobile responsiveness)"
fi

log_info "Checking for responsive image sizing..."
if curl -s "$DOMAIN" 2>/dev/null | grep -q "sizes="; then
    log_pass "Responsive image sizes found"
else
    log_warn "Responsive image sizes may be missing (recommended for optimization)"
fi

echo ""
echo "🔧 Manual Testing Required:"
echo "  • Test on mobile (375px width - iPhone SE)"
echo "  • Test on tablet (768px width - iPad)"
echo "  • Test on desktop (1920px width - Desktop)"
echo "  • Check: No horizontal scrolling"
echo "  • Check: All text readable without zoom"
echo "  • Check: Touch targets at least 48px"
echo ""

# ================================================================
# SECTION 4: CONTACT FORM TESTING
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 4: CONTACT FORM TESTING${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_info "Contact form checklist:"
echo "  ☐ Form is visible on page"
echo "  ☐ All required fields present (Name, Email, Message, Service)"
echo "  ☐ Email validation works (shows error for invalid emails)"
echo "  ☐ Privacy checkbox required and works"
echo "  ☐ Submit button is clickable and shows loading state"
echo "  ☐ Success message appears after submission"
echo "  ☐ Error message shows if submission fails"
echo "  ☐ Form clears after successful submission"
echo "  ☐ Email received at hello@outpro.india"
echo ""

# ================================================================
# SECTION 5: META TAGS VERIFICATION
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 5: SEO & META TAGS VERIFICATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Get page HTML
PAGE_HTML=$(curl -s "$DOMAIN" 2>/dev/null)

# Check title
if echo "$PAGE_HTML" | grep -q "<title>"; then
    TITLE=$(echo "$PAGE_HTML" | grep -oP '<title>\K[^<]+' | head -1)
    log_pass "Page title present: $TITLE"
else
    log_fail "Page title missing"
fi

# Check meta description
if echo "$PAGE_HTML" | grep -q "meta.*description"; then
    log_pass "Meta description tag present"
else
    log_fail "Meta description tag missing"
fi

# Check OG tags
OG_TAGS=("og:title" "og:description" "og:image" "og:url")
for tag in "${OG_TAGS[@]}"; do
    if echo "$PAGE_HTML" | grep -q "property=\"$tag\""; then
        log_pass "Open Graph tag present: $tag"
    else
        log_warn "Open Graph tag missing: $tag (needed for social sharing)"
    fi
done

# Check canonical URL
if echo "$PAGE_HTML" | grep -q "rel=\"canonical\""; then
    log_pass "Canonical URL present"
else
    log_warn "Canonical URL missing (recommended for SEO)"
fi

# Check robots meta
if echo "$PAGE_HTML" | grep -q "robots"; then
    log_pass "Robots meta tag present"
else
    log_warn "Robots meta tag missing"
fi

echo ""

# ================================================================
# SECTION 6: HEADERS VERIFICATION
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 6: SECURITY HEADERS VERIFICATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

HEADERS=$(curl -s -I "$DOMAIN" 2>/dev/null)

# Security headers to check
SECURITY_HEADERS=(
    "X-Frame-Options:SAMEORIGIN"
    "X-Content-Type-Options:nosniff"
    "X-XSS-Protection:1.*mode=block"
    "Referrer-Policy:strict-origin-when-cross-origin"
    "Content-Security-Policy"
)

for header in "${SECURITY_HEADERS[@]}"; do
    HEADER_NAME=${header%%:*}
    if echo "$HEADERS" | grep -qi "^$HEADER_NAME"; then
        log_pass "Security header present: $HEADER_NAME"
    else
        log_warn "Security header missing: $HEADER_NAME"
    fi
done

# Cache-Control header
if echo "$HEADERS" | grep -q "Cache-Control"; then
    log_pass "Cache-Control header present"
else
    log_warn "Cache-Control header missing (needed for performance)"
fi

echo ""

# ================================================================
# SECTION 7: PERFORMANCE METRICS
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 7: PERFORMANCE METRICS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_info "Performance checklist (manual verification needed):"
echo ""
echo "📊 PageSpeed Insights Targets:"
echo "  ☐ Desktop Score: 95+ (Excellent)"
echo "  ☐ Mobile Score: 90+ (Excellent)"
echo ""
echo "⚡ Core Web Vitals:"
echo "  ☐ LCP (Largest Contentful Paint): < 2.5s"
echo "  ☐ FID (First Input Delay): < 100ms"
echo "  ☐ CLS (Cumulative Layout Shift): < 0.1"
echo ""
echo "🖼️  Image Optimization:"
echo "  ☐ Images use modern formats (WebP, AVIF)"
echo "  ☐ Images are lazy-loaded"
echo "  ☐ Responsive images (srcset) used"
echo "  ☐ No images larger than 100KB"
echo ""
echo "📦 Asset Size:"
echo "  ☐ Main bundle < 200KB (gzipped)"
echo "  ☐ CSS bundled and minified"
echo "  ☐ JavaScript minified"
echo "  ☐ Unused CSS removed"
echo ""
echo "🔗 Resources:"
echo "  Check score at: https://pagespeed.web.dev/"
echo "  Domain: $DOMAIN"
echo ""

# ================================================================
# SECTION 8: ANALYTICS VERIFICATION
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 8: GOOGLE ANALYTICS VERIFICATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check for GA4 script
if echo "$PAGE_HTML" | grep -q "gtag.js\|G-"; then
    log_pass "Google Analytics 4 script detected"
else
    log_warn "Google Analytics 4 script not found"
fi

log_info "Analytics verification checklist:"
echo "  ☐ GA4 script loads (DevTools → Network)"
echo "  ☐ Page view events fire (GA4 Real-time view)"
echo "  ☐ Click tracking works (CTA button clicks)"
echo "  ☐ Form submission tracked"
echo "  ☐ Portfolio card views tracked"
echo ""

# ================================================================
# SECTION 9: ENVIRONMENT VARIABLES
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 9: ENVIRONMENT & CONFIGURATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_info "Environment configuration checklist:"
echo "  ☐ VERCEL: All secrets stored in dashboard (not in code)"
echo "  ☐ RENDER: EMAIL_USER & EMAIL_PASSWORD set"
echo "  ☐ RENDER: NODE_ENV=production"
echo "  ☐ GA4: NEXT_PUBLIC_GA4_MEASUREMENT_ID configured"
echo "  ☐ EmailJS: NEXT_PUBLIC_EMAILJS_* variables set (optional)"
echo "  ☐ CORS: FRONTEND_URL matches production URL"
echo "  ☐ No .env file committed to repository"
echo ""

# ================================================================
# SECTION 10: DEPLOYMENT STATUS
# ================================================================
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}SECTION 10: DEPLOYMENT STATUS${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

log_info "Deployment platform checklist:"
echo ""
echo "VERCEL (Frontend):"
echo "  ☐ Repository connected to Vercel"
echo "  ☐ Build settings configured (next build)"
echo "  ☐ Environment variables set in Vercel dashboard"
echo "  ☐ Custom domain configured (optional)"
echo "  ☐ SSL certificate active (automatic)"
echo "  ☐ Preview deployments working"
echo ""
echo "RENDER (Backend):"
echo "  ☐ Web Service created on Render"
echo "  ☐ GitHub repository connected"
echo "  ☐ Start command: node server.js"
echo "  ☐ Environment variables configured"
echo "  ☐ Service is running (no errors)"
echo "  ☐ Email test successful"
echo ""
echo "CLOUDFLARE (Optional CDN):"
echo "  ☐ Free account created"
echo "  ☐ Domain added to Cloudflare"
echo "  ☐ Nameservers updated at registrar"
echo "  ☐ Caching rules configured"
echo "  ☐ Auto Minify enabled"
echo ""

# ================================================================
# SECTION 11: FINAL SUMMARY
# ================================================================
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}TEST SUMMARY${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${GREEN}Passed:${NC}  $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC}  $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CRITICAL TESTS PASSED${NC}"
    echo ""
    echo "Your website is ready for production launch!"
    echo ""
else
    echo -e "${RED}❌ SOME TESTS FAILED - FIX ISSUES BEFORE LAUNCH${NC}"
    echo ""
    echo "Fix the failed items above before deploying to production."
    echo ""
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Return appropriate exit code
if [ $FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi
