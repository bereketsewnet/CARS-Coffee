import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cares-center.org";
const SITE_NAME = "CARES – Circular Coffee Project";
const DEFAULT_TITLE = "CARES | Circular Economy Coffee Research – Ethiopia & Belgium";
const DEFAULT_DESC =
  "CARES is a VLIR-UOS funded north–south research project transforming Ethiopia's coffee waste into green energy, bio-pesticides, and cosmetics, empowering smallholder farmers and women's cooperatives in Sidama and Yirgacheffe.";
const OG_IMAGE = `${SITE_URL}/assets/CARES_LOGO.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | CARES Circular Coffee",
  },
  description: DEFAULT_DESC,
  keywords: [
    "CARES", "circular coffee", "VLIR-UOS", "Ethiopia", "Belgium", "coffee waste",
    "biorefinery", "circular economy", "Sidama", "Yirgacheffe", "smallholder farmers",
    "green energy", "bio-pesticides", "research project", "Addis Ababa University",
    "University of Antwerp", "CTBE-AAU", "coffee sustainability", "agricultural research",
  ],
  authors: [{ name: "CARES Research Project" }],
  creator: "CARES – Circular Coffee Project",
  publisher: "VLIR-UOS",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CARES Circular Coffee Project Logo" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
    creator: "@cares-center",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: undefined,
  category: "science",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a2e1a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
