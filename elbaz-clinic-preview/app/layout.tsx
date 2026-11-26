import type { Metadata, Viewport } from "next";
import { Amiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ar } from "@/content/ar";
import "./globals.css";

const display = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: ar.meta.title,
  description: ar.meta.description,
  // Concept preview: keep it out of search results until the clinic approves it.
  robots: { index: false, follow: false },
  openGraph: {
    title: ar.meta.title,
    description: ar.meta.description,
    locale: "ar_EG",
    type: "website",
  },
  alternates: { languages: { ar: "/" } },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          // Enables reveal-on-scroll only when JS runs, so content never hides without it.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
