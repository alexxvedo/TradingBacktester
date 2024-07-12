"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import TradingIcon from "@/public/trading.svg";
import StatsIcon from "@/public/stats.svg";
import Logo from "@/public/logo2.png";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

export default function Sidebar() {
  const { userId } = useAuth();

  if (!userId) return null;

  return (
    userId && (
      <div className="max-w-24 min-w-24 min-h-screen max-h-screen p-4">
        <aside className="bg-zinc-900 py-2 px-1 h-full flex flex-col transition-width duration-300 ease-in-out rounded-lg items-center">
          <Link href="/">
            <Image src={Logo} alt="Pause" className=" w-full" />
          </Link>
          <hr className="my-4 w-full" />
          <nav className="h-full w-full flex flex-col flex-grow items-center gap-4 ">
            <Tooltip content="Sesiones">
              <Link
                href="/sesiones"
                className="flex w-[80%] items-center justify-center"
              >
                <Button
                  variant="light"
                  isIconOnly
                  aria-label="Sesiones"
                  className="max-w-full"
                >
                  <Image
                    src={TradingIcon}
                    alt="Pause"
                    className="max-w-[80%] max-h-[80%]"
                  />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip content="Estadísticas">
              <Link
                href="/estadisticas"
                className="flex w-[80%] items-center justify-center"
              >
                <Button
                  variant="light"
                  isIconOnly
                  aria-label="Sesiones"
                  className="max-w-full"
                >
                  <Image
                    src={StatsIcon}
                    alt="Pause"
                    className="max-w-[80%] max-h-[80%]"
                  />
                </Button>
              </Link>
            </Tooltip>
          </nav>

          <hr className="my-4" />
          <div className="flex flex-col gap-4 items-center justify-center w-full pb-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </aside>
      </div>
    )
  );
}
