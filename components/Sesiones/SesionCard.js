import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import "chart.js/auto";
//import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SesionCardContent from "./SesionCardContent";

const SesionCard = ({ sesion }) => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const res = await fetch(`/api/operations?sessionId=${sesion.id}`);
        const data = await res.json();

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
        let currentBalance = sesion.accountSize;
        const calculatedBalances = [
          {
            date: new Date(sesion.startDate).toLocaleDateString(),
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
      } catch (error) {
        console.error("Failed to fetch operations:", error);
      }
    };

    fetchOperations();
  }, [sesion.id, sesion.accountSize]);

  const data = [
    balances.map((b) => {
      return {
        date: new Date(b.date).toLocaleDateString(),
        balance: b.balance,
      };
    }),
  ];

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
          <Button color="primary">Go to session</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <SesionCardContent sesion={sesion} balances={balances} />
      </CardContent>
    </Card>
  );
};

export default SesionCard;
