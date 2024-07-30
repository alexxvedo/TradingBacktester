"use client";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Image from "next/image";
import CloseFullScreen from "@/public/close_fullscreen.svg";
import OpenFullScreen from "@/public/open_fullscreen.svg";
import PositionsTable from "@/components/Sesiones/PositionsTable";
import HistoryTable from "@/components/Sesiones/HistoryTable";

//import { Tabs, Tab } from "@nextui-org/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PositionPanel({
  panelOpen,
  setPanelOpen,
  sessionId,
  currentPrice,
  orders,
  setOrders,
  saveSessionData,
  accountSize,
  lineSeries,
  priceLines,
  setPriceLines,
  addPriceLines,
  currentCandleDate,
}) {
  const [history, setHistory] = useState([]);
  const [fetchingPositions, setFetchingPositions] = useState(true);
  const [unrealizedPnl, setUnrealizedPnl] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const { userId } = useAuth();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (lineSeries !== null) {
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
            console.log(position);
            if (position.exitPrice) {
              historyPositions.push({
                id: position.id,
                type: position.type,
                size: position.size,
                entryPrice: position.entryPrice,
                exitPrice: position.exitPrice,
                profit: position.profit,
                createdAt: position.createdAt,
                entryDate: position.entryDate,
                exitDate: position.exitDate,
              });
            } else {
              currentPositions.push({
                id: position.id,
                type: position.type,
                size: position.size,
                entryPrice: position.entryPrice,
                profit: position.profit,
                tp: position.tp,
                sl: position.sl,
                entryDate: position.entryDate,
              });
              console.log("Anadiendo priceLine");
              addPriceLines(position);
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
    }
  }, [sessionId, lineSeries]);

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
  if (!mounted) return null;

  return (
    userId && (
      <div className="flex flex-col  max-h-full min-h-full h-full w-full rounded-lg align-middle items-center justify-center">
        <div className="flex flex-row w-full h-full">
          <div className="w-full h-[95%] flex flex-col max-h-[95%] items-center justify-center">
            <Tabs
              aria-label="Options"
              className="w-full h-full max-x-full "
              defaultValue="positions"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="positions" className="max-h-full">
                {panelOpen && (
                  <div className="w-full h-full  ">
                    {!fetchingPositions ? (
                      <PositionsTable
                        orders={orders}
                        setOrders={setOrders}
                        history={history}
                        setHistory={setHistory}
                        currentPrice={currentPrice}
                        saveSessionData={saveSessionData}
                        isHistory={false}
                        accountSize={accountSize}
                        lineSeries={lineSeries}
                        priceLines={priceLines}
                        setPriceLines={setPriceLines}
                        currentCandleDate={currentCandleDate}
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
              </TabsContent>
              <TabsContent
                value="history"
                className="max-h-[80%] overflow-y-scroll"
              >
                {panelOpen && (
                  <div className="w-full ">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  );
}
