"use client";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import LineChartIcon from "@/components/Icons/LinechartIcon";
import BarChartIcon from "@/components/Icons/BarchartIcon";
import DollarSignIcon from "@/components/Icons/DollarSignIcon";
import MenuIcon from "@/components/Icons/MenuIcon";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { ModeToggle } from "../ui/modeToggle";

import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

import { usePathname } from "next/navigation"; // Importamos useRouter

export default function Sidebar() {
  const { userId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(null);
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

  // Cargamos el estado del sidebar desde localStorage al montar el componente
  useEffect(() => {
    setMounted(true);
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    if (savedSidebarState !== null && savedSidebarState !== "undefined") {
      console.log("Estado guardado: ", savedSidebarState);
      setIsSidebarOpen(JSON.parse(savedSidebarState)); // Convertimos el string a boolean
    } else {
      setIsSidebarOpen(true); // Si no hay valor guardado, el sidebar está abierto por defecto
    }
  }, []);

  // Guardamos el estado del sidebar en localStorage cuando cambia
  useEffect(() => {
    // Solo guardamos si isSidebarOpen tiene un valor booleano válido (true o false)
    if (isSidebarOpen !== undefined && isSidebarOpen !== null) {
      localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
      console.log(
        "Metiendo el valor del sidebar en el localStorage: ",
        isSidebarOpen
      );
    }
  }, [isSidebarOpen]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  if (!mounted) return null;

  const isOnSessions = pathname === "/sesiones";
  const isOnStatistics = pathname === "/estadisticas";
  const isOnPlans = pathname === "/plan";

  console.log(isSidebarOpen);

  return (
    <div
      className={`border-r bg-muted/40 ${
        isSidebarOpen ? "w-[280px]" : "w-[60px]"
      } `}
    >
      {isSidebarOpen && (
        <ResizablePanelGroup>
          <ResizablePanel className="min-h-screen max-h-screen">
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="flex h-[60px] w-full items-center justify-between border-b ">
                <Link
                  href="#"
                  className="flex items-center gap-2 font-semibold px-6"
                  prefetch={false}
                >
                  <span className="">Trading Backtester</span>
                </Link>
                <Button
                  variant="outline"
                  className="h-8 w-8 justify-end"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <MenuIcon />
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <Link
                    href="/sesiones"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isOnSessions
                        ? "bg-muted text-primary" // Si está en /sesiones, aplicamos estilos activos
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    prefetch={false}
                  >
                    <LineChartIcon className="h-4 w-4" />
                    Sessions
                  </Link>
                  <Link
                    href="/estadisticas"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isOnStatistics
                        ? "bg-muted text-primary" // Si está en /sesiones, aplicamos estilos activos
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    prefetch={false}
                  >
                    <BarChartIcon className="h-4 w-4" />
                    Statistics
                  </Link>
                  <Link
                    href="/plan"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isOnPlans
                        ? "bg-muted text-primary" // Si está en /sesiones, aplicamos estilos activos
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    prefetch={false}
                  >
                    <DollarSignIcon className="h-4 w-4" />
                    Plans
                  </Link>
                </nav>
              </div>
              <div className="flex  items-center justify-between border-t px-4 py-2">
                <div className="flex gap-2 justify-center items-center">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <span>
                    {user.username !== null ? user.username : user.firstName}
                  </span>
                </div>
                <ModeToggle />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
      {!isSidebarOpen && (
        <ResizablePanelGroup>
          <ResizablePanel className="min-h-screen max-h-screen">
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="flex h-[60px] justify-center items-center border-b px-6">
                <Button
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <MenuIcon />
                </Button>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start text-sm font-medium">
                  <Link
                    href="/sesiones"
                    className={`flex items-center justify-center rounded-lg  py-2 transition-all ${
                      isOnSessions
                        ? "bg-muted text-primary" // Si está en /sesiones, aplicamos estilos activos
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    prefetch={false}
                  >
                    <LineChartIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/estadisticas"
                    className={`flex items-center justify-center  gap-3 rounded-lg px-3 py-2 transition-all ${
                      isOnStatistics
                        ? "bg-muted text-primary" // Si está en /sesiones, aplicamos estilos activos
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    prefetch={false}
                  >
                    <BarChartIcon className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/plan"
                    className={`flex items-center justify-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isOnPlans
                        ? "bg-muted text-primary" // Si está en /sesiones, aplicamos estilos activos
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    prefetch={false}
                  >
                    <DollarSignIcon className="h-6 w-6" />
                  </Link>
                </nav>
              </div>
              <div className="flex flex-col items-center justify-between border-t px-4 py-2 gap-4">
                <ModeToggle />

                <div className="flex gap-2 justify-center items-center">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}
