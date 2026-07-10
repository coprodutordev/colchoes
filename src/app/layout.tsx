import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/shared/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Prevent FOUT - critical for Core Web Vitals CLS
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s | REMVITA",
    default: "REMVITA | Colchões Terapêuticos Premium",
  },
  description:
    "A mais avançada tecnologia em colchões terapêuticos. Infravermelho longo, magnetoterapia e densidade inteligente para um sono profundo e restaurador.",
  keywords: [
    "colchão terapêutico",
    "magnetoterapia",
    "infravermelho longo",
    "colchão ortopédico",
    "saúde do sono",
    "colchão premium",
    "dor nas costas",
    "coluna",
  ],
  authors: [{ name: "REMVITA" }],
  creator: "REMVITA",
  publisher: "REMVITA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "REMVITA Colchões Terapêuticos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "REMVITA Colchões Terapêuticos - Tecnologia do Sono",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REMVITA | Colchões Terapêuticos Premium",
    description:
      "A mais avançada tecnologia em colchões terapêuticos. Infravermelho longo, magnetoterapia e densidade inteligente.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
