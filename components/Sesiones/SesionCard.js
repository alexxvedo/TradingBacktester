import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

const SesionCard = ({ sesion }) => {
  const [operations, setOperations] = useState([]);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const res = await fetch(`/api/operations?sessionId=${sesion.id}`);
        const data = await res.json();
        setOperations(data);

        // Group operations by date and keep the last operation of each day
        const groupedOperations = data.reduce((acc, op) => {
          const date = new Date(op.createdAt).toLocaleDateString();
          if (
            !acc[date] ||
            new Date(acc[date].createdAt).toLocaleString() <
              new Date(op.createdAt).toLocaleString()
          ) {
            acc[date] = op;
          }
          return acc;
        }, {});

        // Calculate the balance over time
        let currentBalance = sesion.accountSize;
        const calculatedBalances = Object.values(groupedOperations).map(
          (op) => {
            currentBalance += op.profit;
            return { date: op.createdAt, balance: currentBalance };
          },
        );

        setBalances(calculatedBalances);
      } catch (error) {
        console.error("Failed to fetch operations:", error);
      }
    };

    fetchOperations();
  }, [sesion.id, sesion.accountSize]);

  const data = {
    labels: balances.map((b) => new Date(b.date).toLocaleDateString()),
    datasets: [
      {
        label: "Balance Over Time",
        data: balances.map((b) => b.balance),
        fill: false,
        backgroundColor: "rgb(132, 99, 255)",
        borderColor: "rgba(132, 99, 255, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex items-center justify-between flex-col w-full gap-2">
        <Link href={`/sesiones/${sesion.id}`} className="text-white">
          <h4 className="font-bold text-2xl">{sesion.title}</h4>
        </Link>
        <small className="text-default-500">
          {new Date(sesion.createdAt).toLocaleString()}
        </small>
      </CardHeader>
      <CardBody>
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
      </CardBody>
    </Card>
  );
};

export default SesionCard;
