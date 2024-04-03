import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Header from "../components/header";

const APP_NAME = 'Next FinTracker';
const APP_DEFAULT_TITLE = 'NextFinTracker';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'FinTracker on Next.js';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    startupImage: '/icons/apple-touch-icon.png'
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: '#0070F0'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
        <body className={`${inter.className}`}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
      </html>
  );
}
