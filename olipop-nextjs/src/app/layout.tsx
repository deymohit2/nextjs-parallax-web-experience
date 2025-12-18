import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Olipop - A New Kind of Soda',
  description: 'Olipop is a modern functional soda brand inspired by classic flavors but made with better ingredients. Discover our delicious Cherry, Grape, and Lemon Ginger sodas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
