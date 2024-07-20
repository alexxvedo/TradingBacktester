import { Line } from "react-chartjs-2";

export default function SesionCardContent({ sesion, data, options }) {
  return (
    <div className="w-full h-full">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Start Date:</span>
          <span>{new Date(sesion.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">End Date:</span>
          <span>{new Date(sesion.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total Operations:</span>
          <span>{sesion.totalOperations}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Account Size:</span>
          <span>{sesion.accountSize.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Current Balance:</span>
          <span>{sesion.currentBalance.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Profit:</span>
          <span
            className={
              sesion.profitLoss >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {sesion.profitLoss.toFixed(2)}$
          </span>
        </div>
      </div>
      <div className="mt-4">
        <Line data={data} options={options} height={200} />
      </div>
    </div>
  );
}
