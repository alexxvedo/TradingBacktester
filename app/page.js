import Link from "next/link";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>
        <Link href="/auth/login">Login</Link>
      </Button>
    </main>
  );
}
