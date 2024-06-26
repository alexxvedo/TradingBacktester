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
    <div className="flex flex-row bg-zinc-950 max-h-screen">
      <Sidebar user={user} />
      <div className="flex-1 max-h-[100%] overflow-y-auto my-4">{children}</div>
    </div>
  );
}
