import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Backtester",
  description: "Sesiones",
};

export default function SessionLayout({ children }) {
  return (
    <div className="flex flex-row bg-zinc-950 max-h-screen">
      <Sidebar />
      <div className="flex-1 max-h-[100%] overflow-y-auto my-4">{children}</div>
    </div>
  );
}
