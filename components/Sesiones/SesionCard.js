import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/react";
import "chart.js/auto";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import SesionCardContent from "./SesionCardContent";

const SesionCard = ({ sesion }) => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const res = await fetch(`/api/operations?sessionId=${sesion.id}`);
        const data = await res.json();

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
          }
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
        <SesionCardContent sesion={sesion} data={data} options={options} />
      </CardBody>
    </Card>
  );
};

export default SesionCard;
