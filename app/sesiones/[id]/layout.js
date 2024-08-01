import "@/app/globals.css";

export const metadata = {
  title: "Backtester",
  description: "Sesiones",
};

export default function SessionIdLayout({ children }) {
  return (
    <div className="flex h-screen w-full max-w-[100%] justify-center max-h-[100%] overflow-hidden">
      {children}
    </div>
  );
}
