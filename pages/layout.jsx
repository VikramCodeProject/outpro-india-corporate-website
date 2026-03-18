import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'Outpro.India - Premium Digital Agency',
  description: 'Transform your vision into reality with cutting-edge technology and strategic design.',
  keywords: 'web development, mobile apps, UI/UX design, digital marketing, cloud solutions',
  authors: [{ name: 'Outpro.India' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
