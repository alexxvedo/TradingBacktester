"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
              <Analytics />
              <SpeedInsights />
            </NextThemesProvider>
          </NextUIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
