import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "LeadSync — AI automation for businesses that ship",
  description:
    "Custom AI workflows for lead handling, sales, support, and ops. Built one client at a time on n8n, OpenAI, Claude, and the APIs you already use.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
