import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/sign-in">
        <Button size="large">Sign in</Button>
      </Link>
      <Link href="/sign-up">
        <Button size="large">Sign up</Button>
      </Link>
    </main>
  );
}
