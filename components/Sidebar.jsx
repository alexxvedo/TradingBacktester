"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/public/arrow_left.svg";
import ArrowRight from "@/public/arrow_right.svg";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useState, useEffect } from "react";
import AvatarComponent from "@/app/account/avatarComponent";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

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
      console.log(data.avatar_url, data.username);
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

  const items = [
    {
      key: "Perfil",
      label: "Perfil",
    },
    {
      key: "logout",
      label: "Cerrar sesion",
    },
  ];
  // Clases de ancho con transición
  const widthClass = open ? "w-1/6" : "w-[6%]";

  return (
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
        <Dropdown>
          <DropdownTrigger>
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
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actios" items={items}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "logout" ? "danger" : "default"}
                className={item.key === "logout" ? "text-danger" : ""}
              >
                {item.key === "logout" ? (
                  <form action="/auth/signout" method="post">
                    <button type="submit">{item.label}</button>
                  </form>
                ) : (
                  <Link href="/account"> {item.label}</Link>
                )}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </aside>
    </div>
  );
}
