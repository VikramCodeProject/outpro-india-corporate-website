# Outpro.India — Premium Digital Agency Website
## Wireframe & Design Specification

### DESIGN SYSTEM

**Color Palette:**
- Primary Dark: #0A0E27 (deep navy, background)
- Dark Accent: #1a1f3a (card backgrounds)
- Gold Primary: #D4AF37 (accents, CTAs, highlights)
- Gold Secondary: #C9A961 (hover states, borders)
- Neutral Light: #E8E8E8 (text, secondary content)
- Neutral Gray: #999999 (supporting text)

**Typography:**
- Serif Font (Primary): Playfair Display / Didot (headings, premium feel)
- Sans Font (Secondary): Inter / Montserrat (body, metadata, UI elements)
- Headline: 56px / 3.5rem (Playfair, weight 700)
- Subheading: 28px / 1.75rem (Playfair, weight 600)
- Body: 16px / 1rem (Inter, weight 400)
- Caption: 12px / 0.75rem (Inter, weight 500, color: #999999)

**Spacing Grid:** 8px base unit
- Padding: 16px, 24px, 32px, 48px, 64px
- Margins: 24px, 48px, 80px, 120px
- Gaps (flex/grid): 16px, 24px, 32px

---

## SECTION 1: HOME

### 1.1 Hero Banner (Full Viewport Height)
**Layout:** Single column, centered, full-width background image with overlay
- **Dimensions:** 100vw × 75vh (mobile: 100vw × 100vh)
- **Background:** Hero image (luxury office/digital tech) with 70% dark overlay gradient (top: transparent, bottom: #0A0E27)

**Content Positioning:**
```
┌─────────────────────────────────────┐
│                                     │
│         Centered Content            │
│      (V-aligned, middle)            │
│                                     │
│  "Elevate Your Digital Presence"   │ (56px Serif)
│                                     │
│  Premium Solutions for Forward      │ (20px Sans, #E8E8E8)
│  Thinking Businesses                │
│                                     │
│  [GET STARTED]  [EXPLORE WORK]      │ (CTA buttons)
│                                     │
│                                     │
└─────────────────────────────────────┘
        ↓ Scroll Indicator (animated)
```

**Interactive Elements:**
- CTA Buttons: 
  - Primary "GET STARTED" — gold (#D4AF37), padding 14px 40px, serif text, hover: background shift to #C9A961
  - Secondary "EXPLORE WORK" — transparent border (2px gold), hover: gold fill, smooth 0.3s transition
- Hero text: Fade-in animation on load (0.8s ease-in-out)
- Scroll indicator: Bouncing arrow, infinite animation, scroll to fade out
- Mouse hover parallax: Background image moves 5% on mouse movement (subtle)

**Mobile Layout (< 768px):**
- Hero height: 100vh (single screen)
- Heading: 36px
- Subheading: 16px
- Buttons stack vertically, full width (60% max-width centered)
- Remove parallax effect, simplify animation

---

### 1.2 Metrics Bar Section
**Layout:** Below hero, full-width dark background (#1a1f3a)
- **Dimensions:** 100% width × auto height
- **Padding:** 64px 48px (mobile: 48px 24px)

**Grid Structure:** 4 columns (mobile: 2 columns, stacking)
```
┌──────────┬──────────┬──────────┬──────────┐
│   150+   │   98%    │   24/7   │   500K+  │
│ Projects │ Success  │  Support │ Code     │
│          │   Rate   │          │ Lines    │
└──────────┴──────────┴──────────┴──────────┘
```

**Card Structure (each metric):**
- Number: 48px Serif, gold (#D4AF37)
- Label: 14px Sans, #E8E8E8
- Card padding: 32px
- Centered text alignment
- Borders: 1px gold divider between columns (mobile: no dividers)

**Interactive Elements:**
- Hover effect: Card background shifts to #0A0E27, scale 1.05, 0.3s transition
- Counter animation: Numbers count up from 0 on page load (1.5s duration)

**Mobile Layout:**
- 2×2 grid
- Dividers removed
- Wider row gaps (24px)
- Padding: 32px 20px

---

### 1.3 CTA Buttons Row
**Layout:** Full-width section below metrics, dark background
- **Padding:** 48px
- **Content:** Two prominent CTAs side-by-side (mobile: stacked)

```
┌─────────────────────────────────────┐
│  [SCHEDULE A CONSULTATION]          │
│          →                          │
│  [DOWNLOAD PORTFOLIO]               │
│          ↓                          │
└─────────────────────────────────────┘
```

**Button Styling:**
- Large buttons: 56px height, 48px v-padding, 40px h-padding
- Gold primary, white text, serif font weight 600
- Hover: gold→darker gold, slight shadow increase
- Arrow icon on hover (animated slide-in, 0.3s)
- Gap between buttons: 24px (mobile: 0)

---

## SECTION 2: ABOUT US

### 2.1 Section Header
**Layout:** Full-width, centered
- **Padding:** 80px 48px 40px
- **Text alignment:** Center

```
┌─────────────────────────────────────┐
│    About Outpro.India              │ (56px Serif)
│                                     │
│  Crafting Excellence in Digital     │ (18px Sans)
│  Transformation Since 2015          │
│                                     │
│  ────────────────                   │ (Gold rule, 80px width)
│
```

---

### 2.2 Company Story (Two-Column Layout)
**Layout:** 2 columns, asymmetric (60/40), max-width 1200px, centered
- **Gap:** 48px
- **Padding:** 40px 48px 80px

```
┌────────────────────────┬──────────────┐
│                        │              │
│  [Story Text]          │ [Hero Image] │
│  (60% width)           │  (40% width) │
│                        │              │
│  "Our journey began     │              │
│   with a simple vision" │              │
│                        │              │
│  [Body text, 16px]     │              │
│  3-4 paragraphs        │              │
│                        │              │
└────────────────────────┴──────────────┘
```

**Content Details:**
- Heading: 36px Serif, gold accent on first word
- Body text: 16px Sans, #E8E8E8, line-height 1.8
- Text block padding: 0
- Image: Border 2px gold, subtle shadow, border-radius 4px

**Interactive Elements:**
- Image: Hover → brightness increase 10%, scale 1.02, 0.4s ease
- Text: Fade-in on scroll (intersection observer)

**Mobile Layout:**
- Single column (text above image)
- Full width minus padding
- Image: 100% container width

---

### 2.3 Mission, Vision & Values (3-Column Grid)
**Layout:** 3 equally-sized columns, full-width dark section (#1a1f3a)
- **Padding:** 64px 48px
- **Gap:** 32px
- **Mobile:** Single column stacking

```
┌──────────────┬──────────────┬──────────────┐
│   MISSION    │   VISION     │   VALUES     │
├──────────────┼──────────────┼──────────────┤
│              │              │              │
│  [Icon]      │  [Icon]      │  [Icon]      │
│              │              │              │
│  "To deliver"│  "Technology"│  "Innovation"│
│   innovative │   as bridge" │   "Trust"    │
│   solutions" │              │  "Excellence"│
│              │              │              │
│  [Body]      │  [Body]      │  [Body]      │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Card Structure:**
- Background: #0A0E27
- Padding: 32px
- Border-top: 3px gold
- Icon: 48px, centered, gold color
- Title: 24px Serif, white, centered
- Description: 14px Sans, #E8E8E8, centered

**Interactive Elements:**
- Card hover: Border-top expands to left/right (5px shorter to full width), scale 1.03, shadow deepens
- Icon on hover: Rotation 360° (0.6s ease-out)

---

### 2.4 Team Section (Grid)
**Layout:** Team members in 3-column grid (mobile: 2 columns, tablet: 3)
- **Padding:** 80px 48px
- **Gap:** 40px
- **Max-width:** 1200px, centered

```
┌────────────┬────────────┬────────────┐
│            │            │            │
│ [Avatar]   │ [Avatar]   │ [Avatar]   │
│   Name     │   Name     │   Name     │
│   Role     │   Role     │   Role     │
│   Bio      │   Bio      │   Bio      │
│                         │            │
├────────────┼────────────┼────────────┤
│            │            │            │
│ [Avatar]   │ [Avatar]   │ [Avatar]   │
│   Name     │   Name     │   Name     │
│   Role     │   Role     │   Role     │
│   Bio      │   Bio      │   Bio      │
│                                      │
└────────────┴────────────┴────────────┘
```

**Member Card:**
- Background: #1a1f3a
- Padding: 24px
- Avatar: 120px circular image, gold border (2px)
- Name: 18px Serif, white
- Role: 12px Sans, gold
- Bio: 14px Sans, #E8E8E8, centered
- Social links: 3 icons (LinkedIn, Twitter, Email) in row below bio, gold hover

**Interactive Elements:**
- Card on hover: Background brightens, shadow increases, avatar scale 1.08
- Social icons: Appear/fade in on card hover (0.3s fade)
- Avatar hover: Subtle zoom + brightness

---

## SECTION 3: SERVICES

### 3.1 Section Header
**Layout:** Centered, full-width
- **Padding:** 80px 48px 40px

```
┌─────────────────────────────────────┐
│   Our Services                      │ (56px Serif)
│                                     │
│   Comprehensive Solutions for       │ (18px Sans)
│   Digital Growth                    │
│                                     │
│   ────────────────                  │
│
```

---

### 3.2 Service Cards (2x3 Grid)
**Layout:** 6 cards in 3-column grid (mobile: 1 column, tablet: 2 columns)
- **Padding:** 40px 48px 80px
- **Gap:** 32px
- **Max-width:** 1200px, centered

```
┌─────────────┬─────────────┬─────────────┐
│             │             │             │
│ 1. Web Dev  │ 2. Mobile   │ 3. UI/UX    │
│             │             │             │
├─────────────┼─────────────┼─────────────┤
│             │             │             │
│ 4. Digital  │ 5. Cloud    │ 6. Brand    │
│ Marketing   │ Solutions   │ Strategy    │
│             │             │             │
└─────────────┴─────────────┴─────────────┘
```

**Service Card Structure:**
- Background: #1a1f3a
- Padding: 40px
- Border: 1px #333333
- Border-radius: 8px
- Height: 320px (flex column, space-between)

**Card Content:**
```
┌────────────────────────┐
│  [Icon: 48px, gold]    │
│                        │
│  "Web Development"     │ (24px Serif)
│                        │
│  Build scalable,       │ (14px Sans)
│  responsive web        │
│  applications with     │
│  modern tech stack     │
│                        │
│  [Learn More →]        │ (link, gold hover)
│                        │
└────────────────────────┘
```

**Interactive Elements:**
- Card hover: 
  - Border color → gold
  - Background → #0A0E27
  - Scale → 1.05
  - Shadow → 0 8px 32px rgba(212, 175, 55, 0.2)
  - Transition: 0.3s ease
- Icon on hover: Scale 1.15, rotation 5°, color flash
- "Learn More" link: Gold, smooth underline animation on hover

**Mobile Layout:**
- Single column, full width minus padding
- Cards height: auto (content-driven)

---

## SECTION 4: PORTFOLIO

### 4.1 Section Header
**Layout:** Centered
- **Padding:** 80px 48px 40px

```
┌─────────────────────────────────────┐
│   Portfolio                         │
│                                     │
│   Award-Winning Case Studies        │
│                                     │
│   ────────────────                  │
│
```

---

### 4.2 Case Study Cards (Masonry/Grid Layout)
**Layout:** 2x3 grid alternating layouts (desktop), single column (mobile)
- **Padding:** 40px 48px 80px
- **Gap:** 40px
- **Max-width:** 1300px, centered

**Card Pattern (Alternating):**

**Odd Cards (1, 3, 5): Image-Left Layout**
```
┌──────────────────┬──────────────┐
│                  │              │
│  [Hero Image]    │ Case Title   │
│                  │              │
│  (60% width)     │ Client Name  │
│                  │              │
│  (aspect 4:3)    │ Challenge    │
│                  │ (14px)       │
│                  │              │
│                  │ Solution     │
│                  │ (14px)       │
│                  │              │
│                  │ ┌──────────┐ │
│                  │ │ 150% ROI │ │
│                  │ │ Traffic+ │ │
│                  │ └──────────┘ │
│                  │              │
│                  │[View Case →] │
└──────────────────┴──────────────┘
```

**Even Cards (2, 4, 6): Image-Right Layout**
```
┌──────────────┬──────────────────┐
│              │                  │
│ Case Title   │  [Hero Image]    │
│              │                  │
│ Client Name  │  (60% width)     │
│              │                  │
│ Challenge    │  (aspect 4:3)    │
│ (14px)       │                  │
│              │                  │
│ Solution     │                  │
│ (14px)       │                  │
│              │                  │
│ ┌──────────┐ │                  │
│ │ 280% Cvt │ │                  │
│ │ Rate↑    │ │                  │
│ └──────────┘ │                  │
│              │                  │
│[View Case →] │                  │
└──────────────┴──────────────────┘
```

**Card Details:**
- Title: 28px Serif
- Client Name: 14px Sans, gold
- Challenge: "The Challenge" (label) + 14px text
- Solution: "Our Solution" (label) + 14px text  
- KPI boxes: 3-4 results in gold boxes with white text, 12px Sans

**Interactive Elements:**
- Image hover: 
  - Brightness 120%
  - Overlay gradient appears (0→20% opacity black to transparent)
  - Scale 1.04
  - 0.4s ease transition
- Card on hover:
  - Text color "View Case →" → gold
  - Underline animates in
  - Slight shadow increase
- Full card is clickable (cursor: pointer)

**Mobile Layout:**
- Single column, full width
- All cards image-top layout:
  ```
  ┌────────────────────┐
  │  [Hero Image]      │
  │  (100% width)      │
  ├────────────────────┤
  │  Case Title        │
  │  Client / KPIs     │
  │  Challenge/Soln    │
  │  [View Case →]     │
  └────────────────────┘
  ```

---

## SECTION 5: TESTIMONIALS

### 5.1 Section Header
**Layout:** Centered
- **Padding:** 80px 48px 40px

```
┌─────────────────────────────────────┐
│   Client Testimonials               │
│                                     │
│   Trusted by Industry Leaders       │
│                                     │
│   ────────────────                  │
│
```

---

### 5.2 Testimonial Cards (4-Column Grid)
**Layout:** 4 cards in single row (tablet: 2x2, mobile: single column)
- **Padding:** 40px 48px 80px
- **Gap:** 24px
- **Max-width:** 1400px, centered

```
┌──────────┬──────────┬──────────┬──────────┐
│          │          │          │          │
│ [Quote]  │ [Quote]  │ [Quote]  │ [Quote]  │
│          │          │          │          │
├──────────┼──────────┼──────────┼──────────┤
│ [Avatar] │ [Avatar] │ [Avatar] │ [Avatar] │
│  Name    │  Name    │  Name    │  Name    │
│  Title   │  Title   │  Title   │  Title   │
│  Company │  Company │  Company │  Company │
│          │          │          │          │
└──────────┴──────────┴──────────┴──────────┘
```

**Card Structure:**
- Background: #1a1f3a
- Padding: 32px
- Border-left: 3px gold
- Border-radius: 4px

**Card Content:**
```
┌────────────────────────┐
│  "This is outstanding" │ (Quote text)
│   work. Outpro.India   │ (18px, italic)
│   transformed our      │ (line-height 1.6)
│   entire strategy."    │ (quotes styling)
│                        │
│  ⭐⭐⭐⭐⭐           │ (5-star rating)
│                        │
│  ┌──────────────────┐  │
│  │ [Avatar: 48px]   │  │
│  └──────────────────┘  │
│                        │
│  John Smith            │ (16px Sans, bold)
│  CEO, TechCorp         │ (12px Sans, gold)
│                        │
└────────────────────────┘
```

**Interactive Elements:**
- Card hover: 
  - Background → #0A0E27
  - Border-left expands (3px → 5px)
  - Shadow appears
  - Scale 1.02
  - 0.3s ease transition
- Avatar hover: Scale 1.1, brightness 110%
- Stars: Animated on hover (star-by-star fill animation, 0.2s stagger)

**Mobile Layout:**
- Single column
- Full width minus padding
- Card height: auto

---

## SECTION 6: CONTACT

### 6.1 Section Header + Intro
**Layout:** Centered, dark background (#1a1f3a), full-width
- **Padding:** 80px 48px

```
┌─────────────────────────────────────┐
│   Let's Work Together               │
│                                     │
│   Ready to Transform Your Digital   │
│   Presence? Get in Touch Today.     │
│                                     │
│   ────────────────                  │
│
```

---

### 6.2 Main Content (Two-Column Layout)
**Layout:** 2 columns (60/40 split), max-width 1200px, centered
- **Padding:** 60px 48px 80px
- **Gap:** 48px
- **Mobile:** Single column

```
┌────────────────────────┬──────────────┐
│                        │              │
│  [Contact Form]        │ [Info Panel] │
│  (60% width)           │  (40% width) │
│                        │              │
└────────────────────────┴──────────────┘
```

---

### 6.2.1 Contact Form (Left Column)
**Form Structure:**
```
┌────────────────────────────────┐
│  Name                          │
│  [_________________________]    │
│                                │
│  Email                         │
│  [_________________________]    │
│                                │
│  Subject                       │
│  [_________________________]    │
│                                │
│  Message                       │
│  [                         ]   │
│  [                         ]   │
│  [_________________________]   │
│                                │
│  [✓] I agree to privacy policy │
│                                │
│  [SEND MESSAGE]                │
│                                │
└────────────────────────────────┘
```

**Form Styling:**
- Label: 14px Sans, weight 500, #E8E8E8
- Input fields: 
  - Background: #0A0E27
  - Border: 1px #333333
  - Padding: 12px 16px
  - Placeholder: #666666, 14px Sans
  - Focus: Border gold, shadow 0 0 8px rgba(212, 175, 55, 0.3)
  - Font: 14px Sans
- Label-to-input gap: 8px
- Field-to-field gap: 24px

**Submit Button:**
- Full width
- 48px height
- Gold background, white text, 16px Sans bold
- Hover: Background darker gold, shadow increase
- Active: Scale 0.98
- Disabled state: Opacity 0.6, cursor not-allowed

**Interactive Elements:**
- Input focus: Border → gold, shadow glow, smooth 0.2s transition
- Validation states:
  - Valid: Green bottom-border (1px), checkmark icon
  - Invalid: Red bottom-border (1px), error message 12px red
- Success state (post-submit): 
  - Form fade out, confirmation message fade in (0.4s)
  - "Thank you! We'll be in touch shortly" (20px, centered)
  - Gold checkmark animation

---

### 6.2.2 Contact Info Panel (Right Column)
**Layout:** Vertical stack, dark background, enclosed box

```
┌────────────────────────┐
│                        │
│  CONTACT INFORMATION   │ (14px caps, gold)
│                        │
│  ────────────────      │ (gold rule)
│                        │
│  PHONE                 │
│  +91 98765 43210       │ (18px, white)
│                        │
│  EMAIL                 │
│  hello@outpro.india    │ (18px, white)
│                        │
│  ADDRESS               │
│  123 Tech Park         │ (14px)
│  Mumbai, 400001        │
│  India                 │
│                        │
│  OFFICE HOURS          │
│  Monday - Friday       │ (14px)
│  9:00 AM - 6:00 PM IST │
│                        │
│  ────────────────      │ (gold rule)
│                        │
│  [LinkedIn]            │ (3-4 social icons)
│  [Twitter]             │ (gold icons, 24px)
│  [Instagram]           │
│  [Facebook]            │
│                        │
└────────────────────────┘
```

**Panel Styling:**
- Background: #1a1f3a
- Padding: 40px
- Border: 1px #333333
- Border-radius: 4px

**Text Hierarchy:**
- Labels: 12px Sans uppercase, gold, letter-spacing 0.05em
- Values: 16px Sans, #E8E8E8
- Regular text: 14px Sans, #E8E8E8
- Line-height: 1.8

**Interactive Elements:**
- Phone/Email on hover: Text → gold, cursor pointer (clickable)
- Social icons: 
  - Gold color
  - Hover: Scale 1.2, background circle appears at 30% opacity gold
  - 0.3s ease transition
- Panel on hover: Subtle shadow increase

**Mobile Layout:**
- Single column, info panel below form
- Form full width, info panel full width
- Info panel background stays same

---

## SECTION 7: FOOTER

### Footer Layout
**Layout:** Full-width, dark background (#0A0E27)
- **Padding:** 64px 48px 32px

```
┌──────────┬──────────┬──────────┬──────────┐
│          │          │          │          │
│ About    │ Services │ Resources│ Legal    │
│          │          │          │          │
├──────────┼──────────┼──────────┼──────────┤
│                                         │
│     Copyright © 2024 Outpro.India      │
│     All rights reserved                 │
│                                         │
└─────────────────────────────────────────┘
```

**Footer Columns (4-column grid, mobile: single column):**
- Column width: 25% (mobile: 100%)
- Gap: 40px

**Column Content:**
1. **About**
   - Logo
   - "Premium digital solutions..."
   - Social icons row

2. **Services**
   - Web Development
   - Mobile Apps
   - UI/UX Design
   - Digital Marketing
   - Cloud Solutions
   - Brand Strategy

3. **Resources**
   - Blog
   - Case Studies
   - Documentation
   - FAQs

4. **Legal**
   - Privacy Policy
   - Terms of Service
   - Cookie Policy
   - Sitemap

**Styling:**
- Column heading: 14px Sans uppercase, gold
- Links: 13px Sans, #E8E8E8, hover → gold
- Link hover: Underline slide animation (0.3s)

**Bottom Bar:**
- Border-top: 1px #333333
- Margin-top: 40px
- Padding-top: 24px
- Text: 12px Sans, #999999, centered
- Copyright symbol

---

## GLOBAL INTERACTIVE PATTERNS

### Scroll Animations
- **Fade-in on scroll:** Elements fade in as they enter viewport (0.6s ease-in)
- **Slide-in on scroll:** Elements slide from bottom/side (0.7s ease-out)
- **Scale on scroll:** Cards slightly scale as user scrolls through section (subtle, acceleration-based)
- **Reveal animation:** Text reveals line-by-line (stagger: 0.1s between lines)

### Hover States (Global)
- Buttons: Color shift + shadow deepening + cursor: pointer
- Cards: Background color shift + scale 1.02-1.05 + shadow glow
- Links: Underline animation (width: 0% → 100%, 0.3s ease)
- Images: Brightness + slight zoom (1.02-1.04)

### Loading States
- Page load: Staggered fade-in for major sections (0.4s delays)
- Form submission: Button → loading spinner state (animated svg)
- Image loading: Skeleton placeholders with gradient shimmer

### Mobile Optimization (< 768px)
1. **Typography Scale Down:**
   - H1: 56px → 32px
   - H2: 36px → 24px
   - Body: 16px → 14px
   - Keep serif/sans pairing consistent

2. **Spacing Reduction:**
   - Section padding: 80px → 48px
   - Card padding: 40px → 24px
   - Gaps: 32px → 16px-24px

3. **Layout Changes:**
   - All 3-column grids → single column
   - 2-column sections → single column
   - Cards: Remove complex hover animations
   - Simplify shadow/depth effects

4. **Touch-Friendly:**
   - Button height: 48px minimum
   - Touch targets: 44px × 44px minimum
   - Tap feedback: Subtle scale or background flash

5. **Navigation Consideration:**
   - Assume sticky header with hamburger menu
   - Section links in mobile menu
   - Back-to-top floating button (sticky, bottom-right)

---

## DESIGN TOKENS REFERENCE

**Breakpoints:**
- Mobile: 0-767px
- Tablet: 768px-1024px
- Desktop: 1025px+

**Animation/Transition Defaults:**
- Standard transition: 0.3s ease
- Scroll animations: 0.6s-0.8s ease-in-out
- Hover states: 0.2s-0.3s ease

**Shadow Depths:**
- Light: 0 2px 8px rgba(0, 0, 0, 0.1)
- Medium: 0 4px 16px rgba(0, 0, 0, 0.15)
- Heavy: 0 8px 32px rgba(0, 0, 0, 0.2)
- Gold glow: 0 0 12px rgba(212, 175, 55, 0.2)

**Border Radius:**
- Cards/buttons: 4-8px
- Images: 4px
- Avatars: 50% (circles)

---

## NOTES FOR FIGMA IMPLEMENTATION

1. **Create Component Library:**
   - Button component (primary, secondary, sizes)
   - Card component (service, portfolio, testimonial)
   - Input field component (default, focus, error)
   - Icon component set (services, social)

2. **Color Styles:**
   - Name colors in Figma (Dark Primary, Gold Primary, etc.)
   - Use variables for consistent application

3. **Typography Styles:**
   - Create text styles for each size variant
   - Link styles to font library (Playfair Display, Inter)

4. **Prototyping:**
   - Add interactions (hover states, click animations)
   - Test responsive breakpoints
   - Create animation specifications separately

5. **Handoff Preparation:**
   - Document all spacing via "Measure" plugin
   - Export color palette as .ase or .json
   - Include animation specs in design notes

---

**Design Direction Summary:**
Luxury, premium digital agency aesthetic with sophisticated dark palette, strategic gold accents, readable serif-sans pairing, and polished micro-interactions. Every element communicates premium quality while maintaining professional corporate identity. Animations should enhance, not distract. Typography hierarchy guides users naturally through content.
