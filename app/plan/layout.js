import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "Backtester",
  description: "Plans",
};

export default function PlanLayout({ children }) {
  return (
    <div className="flex flex-row max-h-screen">
      <Sidebar />
      <div className="flex-1 max-h-[100%] overflow-y-auto my-4">{children}</div>
    </div>
  );
}
