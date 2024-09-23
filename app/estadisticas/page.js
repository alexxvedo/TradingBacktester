"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchSessions } from "@/utils/sessions";

// Components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [operations, setOperations] = useState([]);
  const [selectedSession, setSelectedSession] = useState("all");
  const [stats, setStats] = useState({});
  const { isLoaded, userId } = useAuth();
  const [balances, setBalances] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchSessions(setIsLoading, setSessions);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedSession === "all") {
      fetchAllOperations();
    } else {
      fetchOperations(selectedSession);
    }
  }, [selectedSession]);

  const fetchOperations = async (sessionId) => {
    try {
      const response = await fetch(`/api/operations?sessionId=${sessionId}`);
      const data = await response.json();
      // Group operations by date and sum the profits of all operations of each day
      const groupedOperations = data.reduce((acc, op) => {
        const date = new Date(op.exitDate).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { date: op.exitDate, totalProfit: 0 };
        }
        acc[date].totalProfit += op.profit;
        return acc;
      }, {});

      // Calculate the balance over time, starting with the initial account size
      let currentBalance = session.accountSize;
      const calculatedBalances = [
        {
          date: new Date(session.startDate).toLocaleDateString(),
          balance: currentBalance,
        },
        ...Object.values(groupedOperations).map((group) => {
          currentBalance += group.totalProfit;
          return {
            date: new Date(group.date).toLocaleDateString(),
            balance: currentBalance,
          };
        }),
      ];

      setBalances(calculatedBalances);
      setOperations(data);
      setCurrentSession(sessions.find((session) => session.id === sessionId));
      console.log(session);
      calculateSessionStats(data, session.accountSize);
    } catch (error) {
      console.error("Error fetching operations:", error);
    }
  };

  const fetchAllOperations = async () => {
    try {
      const allOperations = [];
      let totalInitialBalance = 0;
      for (const session of sessions) {
        console.log(session);
        const response = await fetch(`/api/operations?sessionId=${session.id}`);
        const data = await response.json();
        allOperations.push(...data);
        totalInitialBalance += session.accountSize;
      }
      console.log(totalInitialBalance);

      setOperations(allOperations);
      calculateSessionStats(allOperations, totalInitialBalance);
    } catch (error) {
      console.error("Error fetching all operations:", error);
    }
  };

  const calculateFinalBalance = (initialBalance, operations) => {
    return operations.reduce((balance, op) => {
      return balance + (op.type === "buy" ? op.profit : -op.profit);
    }, initialBalance);
  };

  const calculateSessionStats = (operations, initialBalance) => {
    const finalBalance = calculateFinalBalance(initialBalance, operations);
    const totalProfitLoss = finalBalance - initialBalance;
    const totalOperations = operations.length;
    const winningOperations = operations.filter((op) => op.profit > 0).length;
    const losingOperations = operations.filter((op) => op.profit < 0).length;
    const winningPercentage = (winningOperations / totalOperations) * 100;
    const losingPercentage = (losingOperations / totalOperations) * 100;
    const averageWin = winningOperations
      ? operations
          .filter((op) => op.profit > 0)
          .reduce((acc, op) => acc + op.profit, 0) / winningOperations
      : 0;
    const averageLoss = losingOperations
      ? operations
          .filter((op) => op.profit < 0)
          .reduce((acc, op) => acc + op.profit, 0) / losingOperations
      : 0;
    const ratioWinLoss = averageLoss ? averageWin / averageLoss : 0;
    const maxDrawdown = Math.min(...operations.map((op) => op.drawdown || 0));
    const averageDuration =
      operations.reduce((acc, op) => acc + op.duration, 0) / totalOperations;
    const bestTrade = Math.max(...operations.map((op) => op.profit));
    const worstTrade = Math.min(...operations.map((op) => op.profit));
    const totalVolume = operations.reduce(
      (acc, op) => acc + op.size / 100000,
      0
    );
    const averageVolume = totalOperations ? totalVolume / totalOperations : 0;

    setStats({
      initialBalance,
      finalBalance,
      totalProfitLoss,
      totalOperations,
      winningOperations,
      losingOperations,
      winningPercentage,
      losingPercentage,
      averageWin,
      averageLoss,
      ratioWinLoss,
      maxDrawdown,
      averageDuration,
      bestTrade,
      worstTrade,
      totalVolume,
      averageVolume,
    });
  };

  const minBalance = Math.min(...balances.map((b) => b.balance));
  const maxBalance = Math.max(...balances.map((b) => b.balance));
  const marginValue = minBalance - Math.floor(minBalance * 0.001);

  const singlePoint = balances.length === 1;
  const padding = (maxBalance - minBalance) * 0.1 || 0.1;

  console.log(balances[balances.length - 1]);

  if (currentSession !== null) {
    const startDate = new Date(currentSession.startDate).toLocaleDateString();
    const endDate =
      balances.length > 1
        ? balances[balances.length - 1].date
        : new Date(
            new Date(sesion.startDate).getTime() + 24 * 60 * 60 * 1000
          ).toLocaleDateString();
  } else {
    const startDate = null;
    const endDate = null;
  }

  const chartConfig = {
    balance: {
      label: "Balance",
      color: "hsl(var(--chart-1))",
    },
  };

  const wonLostData = [
    { name: "Won", value: stats.winningOperations || 0 },
    { name: "Lost", value: stats.losingOperations || 0 },
  ];

  const handleSessionChange = (value) => {
    setSelectedSession(value);
  };

  const formatValue = (value) => {
    const formattedValue = parseFloat(value).toFixed(2);
    return formattedValue;
  };

  return (
    userId && (
      <main className="flex flex-col w-full h-full p-4 ">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2 ml-auto">
            <Select defaultValue="all" onValueChange={handleSessionChange}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Select a session" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Sessions</SelectItem>
                  {sessions.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <hr className="w-full my-4 " />

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-muted-foreground">Initial Balance:</div>
                <div className={`text-2xl font-semibold `}>
                  ${formatValue(stats.initialBalance)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Final Balance:</div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.finalBalance) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.finalBalance)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Gain/Loss:</div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.totalProfitLoss) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.totalProfitLoss)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Total Number of Trades:
                </div>
                <div className="text-2xl font-semibold">
                  {stats.totalOperations}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-muted-foreground">
                  Number of Winning Trades:
                </div>
                <div className="text-2xl font-semibold">
                  {stats.winningOperations}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Number of Losing Trades:
                </div>
                <div className="text-2xl font-semibold">
                  {stats.losingOperations}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Percentage of Winning Trades:
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.winningPercentage) >= 50
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatValue(stats.winningPercentage)}%
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Percentage of Losing Trades:
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.losingPercentage) >= 50
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatValue(stats.losingPercentage)}%
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Average Gain per Trade:
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.averageWin) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.averageWin)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Average Loss per Trade:
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.averageLoss) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.averageLoss)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Gain/Loss Ratio:</div>
                <div
                  className={`text-2xl font-semibold ${
                    formatValue(stats.ratioWinLoss) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatValue(stats.ratioWinLoss)}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Drawdown and Duration</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-muted-foreground">Maximum Drawdown:</div>
                <div
                  className={`text-2xl font-semibold ${
                    0 >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.maxDrawdown)}
                </div>
              </div>

              <div>
                <div className="text-muted-foreground">
                  Best Trade (by Gain):
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    143 >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.bestTrade)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Worst Trade (by Loss):
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    -31 >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ${formatValue(stats.worstTrade)}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Volume Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-muted-foreground">
                  Total Trading Volume (lots):
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    25 >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatValue(stats.totalVolume)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Average Trade Volume (lots):
                </div>
                <div
                  className={`text-2xl font-semibold ${
                    1 >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatValue(stats.averageVolume)}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* Gráfico de operaciones ganadas vs. operaciones perdidas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Operaciones Ganadas vs Perdidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart width={400} height={400}>
                      <Pie
                        data={wonLostData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {wonLostData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </CardContent>
                </Card>

                {/* Gráfico de cambios de balance 
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cambios en el Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <AreaChart
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
                        <Area
                          dataKey="balance"
                          type="monotone"
                          stroke="var(--color-balance)"
                          strokeWidth={2}
                          fill="var(--color-balance)"
                          dot={{
                            fill: "var(--color-balance)",
                          }}
                          activeDot={{
                            r: 6,
                          }}
                        />
                        <ReferenceLine
                          y={
                            balances && balances.length > 0
                              ? balances[0].balance
                              : ""
                          }
                          stroke="gray"
                          strokeDasharray="3 3"
                          label={{ value: "Initial Balance", fill: "gray" }}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                */}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  );
};

export default StatisticsPage;
