import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PalworldBreeding.cc — Advanced Breeding Planner & Map",
  description:
    "Advanced Palworld breeding calculator, shortest path planner, passive skill inheritance odds, and interactive spawn map. Fan-made, unofficial tool for Palworld players.",
  keywords: [
    "palworld breeding calculator",
    "palworld breeding",
    "palworld passive skill breeding",
    "palworld shortest breeding path",
    "palworld map",
    "palworld spawn locations",
  ],
  metadataBase: new URL("https://palworldbreeding.cc"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://palworldbreeding.cc",
    siteName: "PalworldBreeding.cc",
    title: "PalworldBreeding.cc — Advanced Breeding Planner & Map",
    description:
      "Advanced Palworld breeding calculator, shortest path planner, passive skill inheritance odds, and interactive spawn map.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PalworldBreeding.cc — Advanced Breeding Planner & Map",
    description:
      "Advanced Palworld breeding calculator, shortest path planner, passive skill inheritance odds, and interactive spawn map.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
