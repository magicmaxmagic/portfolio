import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/app/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://maxencelegendre.com"),
  title: "Maxence Le Gendre | Applied Data Scientist & ML Engineer",
  description:
    "Applied ML systems engineer. Marketing attribution, NLP, MLOps, production systems. Interested in causal inference and decision-oriented modeling.",
  keywords: [
    "data science",
    "machine learning",
    "ML engineering",
    "causal inference",
    "attribution modeling",
    "NLP",
    "MLOps",
  ],
  authors: [{ name: "Maxence Le Gendre" }],
  creator: "Maxence Le Gendre",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.SITE_URL || "https://maxencelegendre.com",
    title: "Maxence Le Gendre | Applied Data Scientist & ML Engineer",
    description:
      "Applied ML systems engineer building production-scale ML systems.",
    siteName: "Maxence Le Gendre",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxence Le Gendre | Applied Data Scientist & ML Engineer",
    description:
      "Applied ML systems engineer building production-scale ML systems.",
    creator: "@maxencelegendre",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          data-domain="maxencelegendre.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <ErrorBoundary>
            <Header />
            <main 
              className="flex-1 w-full" 
              role="main"
              aria-label="Main content"
            >
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
