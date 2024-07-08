import Link from "next/link";
import { Button } from "@nextui-org/button";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
