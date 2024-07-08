"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/public/arrow_left.svg";
import ArrowRight from "@/public/arrow_right.svg";

export default function Sidebar() {
  const { userId } = useAuth();

  if (!userId) return null;

  const [open, setOpen] = useState(false);

  const widthClass = open ? "w-1/6" : "w-[6%]";

  return (
    userId && (
      <div className={` ${widthClass} min-h-screen max-h-screen p-4`}>
        <aside className="bg-zinc-900 p-4 h-full flex flex-col transition-width duration-300 ease-in-out rounded-lg">
          <div
            className={`min-h-[5%] flex flex-row items-center ${
              !open ? "justify-center align-middle" : "justify-between"
            }`}
          >
            {open ? (
              <>
                <h2 className="text-white text-2xl font-bold">Sidebar</h2>
                <Image
                  src={ArrowLeft}
                  alt="Arrow Left"
                  width={24}
                  height={24}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <Image
                src={ArrowRight}
                alt="Arrow Left"
                width={24}
                height={24}
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              />
            )}
          </div>
          <hr className="my-4" />
          <nav className="h-full w-full flex flex-col flex-grow align-start">
            {open && (
              <ul className="w-full gap-4 flex flex-col">
                <Link href="/sesiones">
                  <li className="text-white w-full p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
                    Sesiones
                  </li>
                </Link>
                <Link href="/estadisticas">
                  <li className="text-white w-full p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
                    Estadísticas
                  </li>
                </Link>
              </ul>
            )}
          </nav>

          <hr className="my-4" />
          <div className="flex flex-col gap-4 items-center justify-center w-full ">
            <SignedIn>
              <UserButton className="min-w-24 min-h-24" />
            </SignedIn>
          </div>
        </aside>
      </div>
    )
  );
}
