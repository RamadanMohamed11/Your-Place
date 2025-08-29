import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Place - Mobile Accessories & Repair Services',
  description: 'Premium mobile accessories and professional repair services. Quality products, expert repairs, unbeatable prices.',
  keywords: 'mobile accessories, phone repair, screen replacement, phone cases, chargers, earphones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}