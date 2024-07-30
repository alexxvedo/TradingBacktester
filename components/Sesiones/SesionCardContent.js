import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Link } from "@nextui-org/react";

export default function SesionCardContent({ sesion, balances }) {
  const minBalance = Math.min(...balances.map((b) => b.balance));
  const maxBalance = Math.max(...balances.map((b) => b.balance));
  const marginValue = minBalance - Math.floor(minBalance * 0.001);

  const singlePoint = balances.length === 1;
  const padding = (maxBalance - minBalance) * 0.1 || 0.1;

  const startDate = new Date(sesion.startDate).toLocaleDateString();
  const endDate =
    balances.length > 1
      ? balances[balances.length - 1].date
      : new Date(
          new Date(sesion.startDate).getTime() + 24 * 60 * 60 * 1000,
        ).toLocaleDateString();

  const chartConfig = {
    balance: {
      label: "Balance",
      color: "hsl(var(--chart-1))",
    },
  };
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
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={balances}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
              domain={[startDate, endDate]}
            />
            <YAxis
              domain={[
                singlePoint ? minBalance - padding : marginValue,
                singlePoint ? maxBalance + padding : "auto",
              ]}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="balance"
              type="monotone"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-balance)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
