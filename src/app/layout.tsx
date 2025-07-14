import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Panel Colnexa | Plataforma de Gestión',
  description: 'Accede a la plataforma de gestión de Colnexa. Herramientas modernas, seguras y fáciles de usar para tu empresa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-gray-50 text-slate-900 ${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
