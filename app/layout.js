import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";

import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NextUIProvider>{children}</NextUIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
