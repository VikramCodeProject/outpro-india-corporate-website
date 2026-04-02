'use client';

import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import PremiumSections from '@/components/PremiumSections';
import CorporateSections from '@/components/CorporateSections';
import Footer from '@/components/Footer';

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://outpro.india';
  const title = 'Outpro.India - Premium Digital Agency | Web Development & Design';
  const description =
    'Transform your vision into reality with cutting-edge technology and strategic design. Specializing in web development, mobile apps, UI/UX design, and digital marketing.';
  const keywords =
    'web development, mobile apps, UI/UX design, digital marketing, cloud solutions, digital agency, software development';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
      </Head>
      <Navbar />

      {/* Hero Section */}
      <PremiumSections />
      <CorporateSections />

      <Footer />
    </>
  );
}
