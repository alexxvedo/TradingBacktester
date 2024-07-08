"use client";
import { useSession, signOut } from "next-auth/react"; // adding import
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/public/arrow_left.svg";
import ArrowRight from "@/public/arrow_right.svg";
import AvatarComponent from "@/app/account/avatarComponent";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export default function Sidebar() {
  const { data: session, update } = useSession(); // useSession()

  const [user, setUser] = useState();

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session, user]);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  const items = [
    {
      key: "Perfil",
      label: "Perfil",
    },
    {
      key: "logout",
      label: "Cerrar sesión",
    },
  ];

  const widthClass = open ? "w-1/6" : "w-[6%]";

  return (
    session && (
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
          <Dropdown>
            <DropdownTrigger>
              <div
                className={`flex flex-row items-center ${
                  open ? "justify-between" : "justify-center"
                }`}
              >
                <AvatarComponent
                  uid={user?.id}
                  url={user?.avatarUrl}
                  username={user?.user.email}
                  open={open}
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" items={items}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.key === "logout" ? "danger" : "default"}
                  className={item.key === "logout" ? "text-danger" : ""}
                >
                  {item.key === "logout" ? (
                    <button onClick={handleLogout}>{item.label}</button>
                  ) : (
                    <Link className="min-w-full" href="/account">
                      {item.label}
                    </Link>
                  )}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </aside>
      </div>
    )
  );
}

export async function getServerSideProps(context) {
  const session = await auth(context);
  return {
    props: { session },
  };
}
