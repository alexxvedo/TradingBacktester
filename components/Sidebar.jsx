"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/public/arrow_left.svg";
import ArrowRight from "@/public/arrow_right.svg";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useState, useEffect } from "react";
import AvatarComponent from "@/app/account/avatarComponent";

export default function Sidebar({ user }) {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [avatar_url, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url, username`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  // Clases de ancho con transición
  const widthClass = open ? "w-1/6" : "w-[5%]";

  return (
    <aside
      className={`${widthClass} bg-zinc-900 p-4 min-h-screen max-h-screen flex flex-col transition-width duration-300 ease-in-out`}
    >
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
          <ul className=" w-full gap-4 flex flex-col ">
            <li className="text-white w-full p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
              <Link href="/sesiones">Sesiones </Link>
            </li>
            <li className="text-white w-full p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
              <Link href="/estadisticas">Sesiones </Link>
            </li>
          </ul>
        )}
      </nav>

      <hr className="my-4" />

      <div
        className={`flex flex-row items-center  ${
          open ? "justify-between " : "justify-center "
        }`}
      >
        <AvatarComponent
          uid={user?.id}
          url={avatar_url}
          username={username}
          open={open}
        />
      </div>
    </aside>
  );
}
