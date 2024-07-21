"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import TradingIcon from "@/public/trading.svg";
import StatsIcon from "@/public/stats.svg";
import Logo from "@/public/logo2.png";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import LightModeIcon from "@/public/light_mode.svg";
import DarkModeIcon from "@/public/dark_mode.svg";

export default function Sidebar() {
  const { userId } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!userId) return null;
  return (
    <div
      className="max-w-24 min-w-24 min-h-screen max-h-screen p-4"
      suppressHydrationWarning
    >
      <aside
        className={`${
          theme === "dark" ? "bg-zinc-900" : "bg-zinc-200"
        } py-2 px-1 h-full flex flex-col transition-width duration-300 ease-in-out rounded-lg items-center`}
      >
        <Link href="/">
          <Image src={Logo} alt="Pause" className=" w-full" priority={true} />
        </Link>
        <hr
          className={`${
            theme === "light" ? "invert" : "invert-0"
          } my-4  w-full `}
        />
        <nav className="h-full w-full flex flex-col flex-grow items-center gap-4 ">
          <Tooltip content="Sesiones">
            <Link
              href="/sesiones"
              className={`flex w-[80%] items-center justify-center ${
                theme === "light" ? "invert" : "invert-0"
              }`}
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
                  className="max-w-[80%] max-h-[80%] light:invert"
                />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip content="Estadísticas">
            <Link
              href="/estadisticas"
              className={`flex w-[80%] items-center justify-center ${
                theme === "light" ? "invert" : "invert-0"
              }`}
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
                  className="max-w-[80%] max-h-[80%] light:invert"
                />
              </Button>
            </Link>
          </Tooltip>
        </nav>
        <hr
          className={`${
            theme === "light" ? "invert" : "invert-0"
          } my-4  w-full `}
        />
        <div
          className={`${
            theme === "light" ? "invert" : "invert-0"
          } flex flex-col gap-4 items-center justify-center w-full pb-2`}
        >
          <Tooltip content={theme === "light" ? "Dark Mode" : "Light Mode"}>
            <Button
              isIconOnly
              variant="light"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Image
                src={theme === "light" ? DarkModeIcon : LightModeIcon}
                alt="Toggle Theme"
                className="max-w-[80%] max-h-[80%]"
              />
            </Button>
          </Tooltip>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center w-full pb-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </aside>
    </div>
  );
}
