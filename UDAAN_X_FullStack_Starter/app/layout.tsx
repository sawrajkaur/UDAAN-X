import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UDAAN X — VYORA AI',
  description: 'A multilingual AI workspace for thinking, creating, researching and organizing.',
  manifest: '/manifest.webmanifest',
  applicationName: 'UDAAN X',
};
export const viewport: Viewport = { themeColor: '#101a35', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pa"><body>{children}</body></html>;
}
