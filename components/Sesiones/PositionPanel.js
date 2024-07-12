"use client";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import Image from "next/image";
import ArrowLeft from "@/public/arrow_left.svg";
import ArrowRight from "@/public/arrow_right.svg";
import PositionsTable from "@/components/Sesiones/PositionsTable";
import HistoryTable from "@/components/Sesiones/HistoryTable";
import { Tabs, Tab } from "@nextui-org/tabs";

export default function PositionPanel({
  panelOpen,
  setPanelOpen,
  sessionId,
  currentPrice,
  orders,
  setOrders,
  saveSessionData,
  accountSize,
}) {
  const [history, setHistory] = useState([]);
  const [fetchingPositions, setFetchingPositions] = useState(true);
  const [unrealizedPnl, setUnrealizedPnl] = useState(0);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchPositionHistory = async () => {
      try {
        const res = await fetch(`/api/operations?sessionId=${sessionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        var historyPositions = [];
        var currentPositions = [];
        data.map((position) => {
          if (position.exitPrice) {
            historyPositions.push({
              id: position.id,
              type: position.type,
              size: position.size,
              entryPrice: position.entryPrice,
              exitPrice: position.exitPrice,
              profit: position.profit,
              createdAt: position.createdAt,
            });
          } else {
            currentPositions.push({
              id: position.id,
              type: position.type,
              size: position.size,
              entryPrice: position.entryPrice,
              profit: "0",
            });
          }
        });
        setHistory(historyPositions);

        setOrders(currentPositions);
        setFetchingPositions(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchPositionHistory();
  }, [sessionId]);

  useEffect(() => {
    if (!fetchingPositions) {
      setUnrealizedPnl(() => {
        let total = 0;
        orders.forEach((order) => {
          if (order != null) {
            total +=
              (currentPrice - order.entryPrice) *
              order.size *
              (order.type === "buy" ? 1 : -1);
          }
        });
        return total;
      });
    }
  }, [currentPrice, orders, fetchingPositions]);

  if (!userId) return null;

  return (
    userId && (
      <div className="flex flex-row px-4 max-h-full min-h-full h-full w-full bg-zinc-900 rounded-lg align-middle items-center justify-center">
        <div className="w-full h-[95%] flex flex-col max-h-[95%]">
          <Tabs
            aria-label="Options"
            className="w-full "
            onSelectionChange={() => {
              if (!panelOpen) {
                setPanelOpen(true);
              }
            }}
          >
            <Tab
              key="positions"
              title="Positions"
              className="w-full h-full flex"
            >
              {panelOpen && (
                <div className="w-full max-h-[80%] h-[80%] overflow-hidden ">
                  {!fetchingPositions ? (
                    <PositionsTable
                      orders={orders}
                      setOrders={setOrders}
                      currentPrice={currentPrice}
                      saveSessionData={saveSessionData}
                      isHistory={false}
                      accountSize={accountSize}
                    />
                  ) : (
                    <div
                      className="min-w-full flex flex-col items-center
                    justify-center"
                    >
                      <p>Loading Positions...</p>
                      <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </Tab>
            <Tab key="History" title="History" className="w-full h-full flex">
              {panelOpen && (
                <div className="w-full max-h-[80%] h-[80%] overflow-hidden ">
                  {!fetchingPositions ? (
                    <HistoryTable
                      history={history}
                      setHistory={setHistory}
                      currentPrice={currentPrice}
                      saveSessionData={saveSessionData}
                      isHistory={true}
                    />
                  ) : (
                    <div
                      className="min-w-full flex flex-col items-center
                    justify-center"
                    >
                      <p>Loading Positions...</p>
                      <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
        <div
          className={`w-auto h-[95%] flex ${panelOpen ? "items-start" : "items-center"}`}
        >
          <Image
            src={ArrowLeft}
            alt="Arrow Left"
            width={24}
            height={24}
            onClick={() => setPanelOpen(!panelOpen)}
            className="cursor-pointer"
          />
        </div>
      </div>
    )
  );
}
