import React, { useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
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
    responsive: true,
    height: 300, // or any desired height
  };

  return (
    <Card className="max-w-[500px] h-full">
      <CardHeader className="flex items-center justify-between flex-row w-full gap-2">
        <div className="max-w-[55%]">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-2xl truncate">{sesion.title}</h4>
            <span className="text-default-500 ">{sesion.interval}</span>
          </div>
          <small className="text-default-500">
            {new Date(sesion.createdAt).toLocaleString()}
          </small>
        </div>
        <Link href={`/sesiones/${sesion.id}`} className="max-w-[45%] ">
          <Button variant="ghost" color="secondary">
            Go to session
          </Button>
        </Link>
      </CardHeader>
      <CardBody>
        <SesionCardContent sesion={sesion} data={data} options={options} />
      </CardBody>
    </Card>
  );
};

export default SesionCard;
