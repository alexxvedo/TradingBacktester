import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { Abhaya_Libre } from "next/font/google";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </body>
      </html>
      <Analytics />
      <SpeedInsights />
    </ClerkProvider>
  );
}
