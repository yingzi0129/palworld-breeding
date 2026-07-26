import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PalPickerPortalProvider } from "@/components/pal/pal-picker-context";

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
  verification: {
    google: "2snR-HUr7mFwWQpcQtVqHGZp3R64Epmb_IYOcqx_VKk",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Favicon for Google and browsers */}
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Privacy-friendly analytics by Plausible */}
        <script
          async
          src="https://plausible.shipsolo.io/js/pa-LUjWFhVU6zTFZ76X04q6W.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}}; plausible.init()',
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <PalPickerPortalProvider>
          <Header />
          <div className="pt-16">{children}</div>
          <Footer />
        </PalPickerPortalProvider>
      </body>
    </html>
  );
}
