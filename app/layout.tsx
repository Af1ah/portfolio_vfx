import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Creative Portfolio | VFX & Poster Design",
  description: "Professional portfolio showcasing innovative VFX and poster design work by Kannan",
  generator: "Next.js",
  keywords: ["portfolio", "VFX", "poster design", "motion graphics", "visual effects"],
  authors: [{ name: "Kannan", url: "https://yourdomain.com" }],
  openGraph: {
    title: "Creative Portfolio | VFX & Poster Design",
    description: "Professional portfolio showcasing innovative VFX and poster design work",
    url: "https://yourdomain.com",
    siteName: "Kannan's Portfolio",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Portfolio | VFX & Poster Design",
    description: "Professional portfolio showcasing innovative VFX and poster design work",
    images: ["https://yourdomain.com/images/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster /> {/* Add Toaster component */}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'