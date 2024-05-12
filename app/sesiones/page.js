import SesionCard from "@/components/SesionCard";

export default async function Sesiones() {
  const sesionsCards = [
    {
      title: "Sesión 1",
      description: "Descripción de la sesión 1",
      date: "01/01/2021",
      time: "10:00 am",
      totalOperations: 25,
      profitLoss: 1250.75,
      averageGain: 50.03,
      maxDrawdown: 15.2,
      winRate: 72.5,
    },
    {
      title: "Sesión 2",
      description: "Descripción de la sesión 2",
      date: "02/01/2021",
      time: "10:00 am",
      totalOperations: 32,
      profitLoss: -375.12,
      averageGain: -11.72,
      maxDrawdown: 22.8,
      winRate: 62.5,
    },
    {
      title: "Sesión 3",
      description: "Descripción de la sesión 3",
      date: "03/01/2021",
      time: "10:00 am",
      totalOperations: 18,
      profitLoss: 825.43,
      averageGain: 45.85,
      maxDrawdown: 8.9,
      winRate: 77.8,
    },
    {
      title: "Sesión 4",
      description: "Descripción de la sesión 4",
      date: "04/01/2021",
      time: "10:00 am",
      totalOperations: 41,
      profitLoss: 2150.67,
      averageGain: 52.45,
      maxDrawdown: 12.3,
      winRate: 68.3,
    },
    {
      title: "Sesión 5",
      description: "Descripción de la sesión 5",
      date: "05/01/2021",
      time: "10:00 am",
      totalOperations: 28,
      profitLoss: 1075.92,
      averageGain: 38.43,
      maxDrawdown: 17.6,
      winRate: 71.4,
    },
    {
      title: "Sesión 6",
      description: "Descripción de la sesión 6",
      date: "06/01/2021",
      time: "10:00 am",
      totalOperations: 36,
      profitLoss: -650.23,
      averageGain: -18.06,
      maxDrawdown: 25.1,
      winRate: 58.3,
    },
    {
      title: "Sesión 7",
      description: "Descripción de la sesión 7",
      date: "07/01/2021",
      time: "10:00 am",
      totalOperations: 22,
      profitLoss: 1450.81,
      averageGain: 65.95,
      maxDrawdown: 7.2,
      winRate: 81.8,
    },
    {
      title: "Sesión 8",
      description: "Descripción de la sesión 8",
      date: "08/01/2021",
      time: "10:00 am",
      totalOperations: 29,
      profitLoss: 925.54,
      averageGain: 31.91,
      maxDrawdown: 13.4,
      winRate: 69.0,
    },
  ];

  return (
    <main className="flex w-full h-full flex-col max-h-[100vh] p-4 overflow-y-auto">
      <div className="min-h-[5%] w-full flex justify-start items-center">
        <h2 className="text-2xl font-bold">Sesiones</h2>
      </div>
      <hr className="my-4 w-full" />
      <div className="w-full h-full grid grid-cols-3 gap-4">
        {sesionsCards.map((sesion, index) => (
          <SesionCard key={index} sesion={sesion} />
        ))}
      </div>
    </main>
  );
}
