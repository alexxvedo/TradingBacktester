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

  console.log(user.id);

  return (
    <div className="flex flex-row min-h-screen bg-zinc-950">
      <Sidebar user={user} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
