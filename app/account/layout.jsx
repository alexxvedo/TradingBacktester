import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Backtester",
  description: "Sesiones",
};

export default async function ({ children }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen min-w-full justify-center items-center">
      {children}
    </div>
  );
}
