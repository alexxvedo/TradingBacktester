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
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [operations, setOperations] = useState([]);
  const [selectedSession, setSelectedSession] = useState("all");
  const [stats, setStats] = useState({});
  const { isLoaded, userId } = useAuth();

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
      setOperations(data);
      const session = sessions.find((session) => session.id === sessionId);
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

  const handleSessionChange = (value) => {
    setSelectedSession(value);
  };

  const formatValue = (value) => {
    const formattedValue = parseFloat(value).toFixed(2);
    return value < 0 ? (
      <span className="text-red-500">{formattedValue}</span>
    ) : (
      <span className="text-green-500">{formattedValue}</span>
    );
  };

  return (
    userId && (
      <div className="p-6">
        <div className="min-h-[5%] w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold">Analytics</h2>
          <div className="flex gap-2">
            <Select onValueChange={handleSessionChange}>
              <SelectTrigger>
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
        <hr className="my-4 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                <span>Balance Inicial:</span>
                <span>{formatValue(stats.initialBalance)}</span>
                <span>Balance Final:</span>
                <span>{formatValue(stats.finalBalance)}</span>
                <span>Ganancia/Pérdida Total:</span>
                <span>{formatValue(stats.totalProfitLoss)}</span>
                <span>Número Total de Operaciones:</span>
                <span>{stats.totalOperations}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <span>Número de Operaciones Ganadoras:</span>
                <span>{stats.winningOperations}</span>
                <span>Número de Operaciones Perdedoras:</span>
                <span>{stats.losingOperations}</span>
                <span>Porcentaje de Operaciones Ganadoras:</span>
                <span>{formatValue(stats.winningPercentage)}%</span>
                <span>Porcentaje de Operaciones Perdedoras:</span>
                <span>{formatValue(stats.losingPercentage)}%</span>
                <span>Ganancia Promedio por Operación:</span>
                <span>{formatValue(stats.averageWin)}</span>
                <span>Pérdida Promedio por Operación:</span>
                <span>{formatValue(stats.averageLoss)}</span>
                <span>Ratio Ganancia/Pérdida:</span>
                <span>{formatValue(stats.ratioWinLoss)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drawdown and Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <span>Drawdown Máximo:</span>
                <span>{formatValue(stats.maxDrawdown)}</span>
                <span>Duración Media de las Operaciones:</span>
                <span>{formatValue(stats.averageDuration)}</span>
                <span>Mejor Operación (por Ganancia):</span>
                <span>{formatValue(stats.bestTrade)}</span>
                <span>Peor Operación (por Pérdida):</span>
                <span>{formatValue(stats.worstTrade)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <span>Volumen Total Operado:</span>
                <span>{formatValue(stats.totalVolume)}</span>
                <span>Volumen Promedio por Operación:</span>
                <span>{formatValue(stats.averageVolume)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Balance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                width={500}
                height={300}
                data={operations}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <ReferenceLine
                  y={stats.initialBalance}
                  stroke="gray"
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#8884d8"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operation Types</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                width={500}
                height={300}
                data={[
                  {
                    name: "Compras",
                    value: operations.filter((op) => op.type === "buy").length,
                  },
                  {
                    name: "Ventas",
                    value: operations.filter((op) => op.type === "sell").length,
                  },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Winning vs Losing Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart width={500} height={300}>
                <Pie
                  data={[
                    { name: "Ganadoras", value: stats.winningOperations },
                    { name: "Perdedoras", value: stats.losingOperations },
                  ]}
                  cx={200}
                  cy={150}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {[
                    { name: "Ganadoras", value: stats.winningOperations },
                    { name: "Perdedoras", value: stats.losingOperations },
                  ].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
};

export default StatisticsPage;
