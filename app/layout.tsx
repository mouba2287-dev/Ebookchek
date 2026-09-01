import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'Ebook Check — Diagnostic, Validation & Étude de Marché d\'Ebooks',
  description: 'Valide ton idée d\'ebook avant création ou découvre pourquoi ton livre ne se vend pas sur Chariow et Maketou. Diagnostic gratuit & conseils adaptés au marché ouest-africain.',
  openGraph: {
    title: 'Ebook Check — Pourquoi ton ebook ne se vend pas ?',
    description: 'Diagnostique ton livre digital en 5 axes et valide tes idées d\'ebooks en FCFA.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ebook Check — Diagnostic & Validation d\'Ebooks',
    description: 'Comprends enfin pourquoi ton ebook stagne à 0 vente.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Public+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF3E7] text-[#1B1B2F] font-sans antialiased flex flex-col min-h-screen selection:bg-[#F2A93B]/30 selection:text-[#12122B]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <MobileNav />
      </body>
    </html>
  );
}
