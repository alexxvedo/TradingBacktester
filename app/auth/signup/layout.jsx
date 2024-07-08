import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Backtester",
  description: "Sesiones",
};

export default async function ({ children }) {
  return (
    <div className="flex min-h-screen min-w-full justify-center items-center">
      {children}
    </div>
  );
}
