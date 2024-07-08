"use client";
// SessionProvider must be used with Client Side Rendering
// Therfore we create a separate client side component to run AuthWrapper
import { SessionProvider } from "next-auth/react";

export default function AuthWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
