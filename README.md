# Outpro.India Next.js Project

Professional corporate website for a premium digital agency built with Next.js.

## 📁 Project Structure

```
outpro-india/
├── components/
│   ├── Navbar.jsx              # Fixed header with scroll effects
│   ├── Navbar.module.css       # Navbar styles
│   ├── Hero.jsx                # Landing hero section
│   ├── Hero.module.css         # Hero styles
│   ├── ServiceCard.jsx         # Service card component
│   ├── ServiceCard.module.css  # Service card styles
│   ├── PortfolioCard.jsx       # Portfolio project card
│   ├── PortfolioCard.module.css# Portfolio styles
│   ├── TestimonialCard.jsx     # Testimonial card
│   ├── TestimonialCard.module.css
│   ├── ContactForm.jsx         # Contact form with validation
│   ├── ContactForm.module.css  # Form styles
│   ├── Footer.jsx              # Footer with info & links
│   └── Footer.module.css       # Footer styles
├── pages/
│   ├── index.jsx               # Main page
│   ├── _app.js                 # App shell and GA4 bootstrap
│   └── _document.js            # Global document shell
├── docs/
│   ├── architecture/           # Architecture references
│   ├── deployment/             # Deployment runbooks and checklist
│   ├── guides/                 # Setup and quick-start guides
│   ├── reports/                # Implementation and completion reports
│   └── specs/                  # Product/wireframe specs
├── scripts/
│   ├── deployment-checklist.sh # Automated deployment QA checks
│   └── test-api.sh             # Contact API test script
├── styles/
│   ├── globals.css             # Global styles & CSS variables
│   └── Home.module.css         # Page-specific styles
├── public/
│   └── assets/                 # Images & static files
├── package.json
├── next.config.js
├── .gitignore
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Dark**: #0a0a0f (ink, backgrounds)
- **Slate**: #2a2a3d (secondary backgrounds)
- **Gold**: #c8a96e (primary accent)
- **Gold Light**: #e8d5a3 (accent hover)
- **Paper**: #f5f2eb (light text)
- **Mist**: #8a8a9a (secondary text)

### Typography
- **Serif**: Cormorant Garamond (headings)
- **Sans**: DM Sans (body, UI)
- **Mono**: DM Mono (code, pills)

### Spacing Grid
8px base unit: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 80px, 120px

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy
```bash
npm run build
npm start
```

## 📦 Components

### Navbar
- Fixed position with frosted glass effect on scroll
- Animated gold pulse dot logo
- Smooth scroll to sections
- Mobile hamburger menu with fullscreen overlay

### Hero
- Full-viewport height landing section
- Gradient text "Digital" highlight
- Dual CTA buttons
- Scroll indicator animation

### ServiceCard
- Icon + title + description
- Optional feature list with checkmarks
- Hover animations and border effects
- "Learn More" link

### PortfolioCard
- Alternating image left/right layout
- Challenge/Solution sections
- KPI boxes with hover effects
- Responsive grid layout

### TestimonialCard
- Client quote typography
- 5-star rating display
- Author info (name, title, company)
- Left gold border accent

### ContactForm
- Full form validation
- Name, Email, Subject, Message fields
- Privacy policy checkbox
- Loading state with spinner
- Success/Error messages

### Footer
- 4-column grid (Brand, Company, Services, Connect)
- Tech stack pills
- Social icons
- Copyright & legal links

## 🎯 Features

✅ Responsive design (mobile, tablet, desktop)
✅ Smooth scroll navigation
✅ Hover animations & transitions
✅ Form validation and submission
✅ CSS variables for easy theming
✅ Accessible components (ARIA labels)
✅ Performance optimized
✅ SEO friendly metadata

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

All colors, spacing, and typography use CSS variables defined in `globals.css`. Update these to customize the entire site:

```css
:root {
  --gold: #c8a96e;          /* Primary accent color */
  --ink: #0a0a0f;           /* Dark background */
  --paper: #f5f2eb;         /* Light text */
  /* ... more variables ... */
}
```

## 📄 License

© 2024 Outpro.India. All rights reserved.
