#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * Checks if all required environment variables are set correctly
 * 
 * Usage: node scripts/validate-env.js
 */

require('dotenv').config();

const REQUIRED_ENV_VARS = {
  // Backend
  EMAIL_USER: { optional: false, service: 'backend', description: 'Gmail email address' },
  EMAIL_PASSWORD: { optional: false, service: 'backend', description: 'Gmail app password' },
  PORT: { optional: true, default: '5000', service: 'backend', description: 'Server port' },
  FRONTEND_URL: { optional: true, default: 'http://localhost:3000', service: 'backend', description: 'Frontend URL for CORS' },

  // Frontend (all public vars must have NEXT_PUBLIC_ prefix)
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: { optional: true, service: 'emailjs', description: 'EmailJS Service ID' },
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: { optional: true, service: 'emailjs', description: 'EmailJS Template ID' },
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: { optional: true, service: 'emailjs', description: 'EmailJS Public Key' },
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: { optional: true, service: 'analytics', description: 'Google Analytics 4 Measurement ID' },
  NEXT_PUBLIC_SITE_URL: { optional: true, default: 'https://outpro.india', service: 'general', description: 'Website URL' },
};

console.log('\n🔍 Validating Environment Variables...\n');
console.log('═'.repeat(70));

let hasErrors = false;
let missingRequired = [];
let missingOptional = [];
let allConfigured = [];

// Check each variable
for (const [key, config] of Object.entries(REQUIRED_ENV_VARS)) {
  const value = process.env[key];
  const status = value ? '✅' : '⚠️';
  const isConfigured = !!value;

  if (isConfigured) {
    allConfigured.push({ key, service: config.service, value: maskValue(value) });
    console.log(`${status} ${key.padEnd(40)} [${config.service.toUpperCase()}]`);
    console.log(`   └─ ${config.description}`);
  } else if (!config.optional) {
    hasErrors = true;
    missingRequired.push(key);
    console.log(`❌ ${key.padEnd(40)} [${config.service.toUpperCase()}] - REQUIRED`);
    console.log(`   └─ ${config.description}`);
  } else {
    missingOptional.push({ key, config });
    console.log(`⚠️  ${key.padEnd(40)} [${config.service.toUpperCase()}] - OPTIONAL`);
    if (config.default) {
      console.log(`   └─ ${config.description} (Default: ${config.default})`);
    } else {
      console.log(`   └─ ${config.description}`);
    }
  }
}

console.log('\n' + '═'.repeat(70) + '\n');

// Summary
console.log('📊 SUMMARY\n');
console.log(`✅ Configured: ${allConfigured.length}`);
console.log(`⚠️  Optional (not set): ${missingOptional.length}`);
console.log(`❌ Required (missing): ${missingRequired.length}\n`);

// Show details
if (allConfigured.length > 0) {
  console.log('Configured Services:');
  const services = new Set(allConfigured.map(v => v.service));
  services.forEach(service => {
    const vars = allConfigured.filter(v => v.service === service);
    console.log(`  • ${service.toUpperCase()}: ${vars.length} variable(s)`);
  });
  console.log();
}

if (missingOptional.length > 0) {
  console.log('Optional (not configured):');
  missingOptional.forEach(({ key, config }) => {
    console.log(`  • ${key} (${config.service})`);
  });
  console.log();
}

if (hasErrors) {
  console.log('❌ ERRORS: Missing required environment variables:\n');
  missingRequired.forEach(key => {
    console.log(`  • ${key}`);
  });
  console.log();
  
  // Instructions
  console.log('📝 ACTION REQUIRED:\n');
  console.log('1. Copy .env.example to .env:');
  console.log('   cp .env.example .env\n');
  console.log('2. Add missing required variables to .env\n');
  console.log('3. For Gmail configuration:');
  console.log('   • Go to https://myaccount.google.com/apppasswords');
  console.log('   • Generate 16-character app password');
  console.log('   • Set EMAIL_USER and EMAIL_PASSWORD\n');
  console.log('4. For EmailJS (optional):');
  console.log('   • Sign up at https://www.emailjs.com');
  console.log('   • Create service, template, and get credentials\n');
  console.log('5. For GA4 (optional):');
  console.log('   • Create property at https://analytics.google.com');
  console.log('   • Get Measurement ID\n\n');
  
  process.exit(1);
} else {
  console.log('✅ All required environment variables are configured!\n');
  
  if (missingOptional.length > 0) {
    console.log('💡 TIP: Some optional features are not configured:');
    console.log('   To enable EmailJS or GA4, set the corresponding variables.\n');
  }
  
  console.log('🚀 You can now start the application:\n');
  console.log('   npm run dev          # Start Next.js frontend (port 3000)');
  console.log('   node server.js       # Start Express backend (port 5000)\n\n');
  
  process.exit(0);
}

/**
 * Mask sensitive values (keep first 4 chars)
 */
function maskValue(value) {
  if (!value) return '';
  if (value.length <= 4) return '****';
  return value.substring(0, 4) + '*'.repeat(Math.max(0, value.length - 4));
}
