import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";

export default function PositionCreator({
  currentPrice,
  currentBalance,
  saveSessionData,
  sessionId,
}) {
  const [pnl, setPnl] = useState(0);
  const [unrealizedPnl, setUnrealizedPnl] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderSize, setOrderSize] = useState(100000);
  const [history, setHistory] = useState([]);
  const [fetchingPositions, setFetchingPositions] = useState(true);

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

  const handleOrderSubmit = async (type, size) => {
    const newOrder = {
      type,
      size,
      entryPrice: currentPrice,
      id: orders.length + 1,
    };

    try {
      const res = await fetch("/api/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          type: newOrder.type,
          size: newOrder.size,
          entryPrice: newOrder.entryPrice,
        }),
      });

      if (res.ok) {
        const createdOrder = await res.json();
        setOrders([...orders, { ...newOrder, id: createdOrder.id }]);
        saveSessionData();
      } else {
        console.error("Failed to create operation");
      }
    } catch (error) {
      console.error("Error creating operation:", error);
    }
  };

  const closePosition = (key) => async () => {
    const order = orders.find((order) => order.id === key);
    const newOrderHistory = {
      ...order,
      exitPrice: currentPrice,
      profit:
        (currentPrice - order.entryPrice) *
        order.size *
        (order.type === "buy" ? 1 : -1),
    };

    try {
      const res = await fetch(`/api/operations/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exitPrice: newOrderHistory.exitPrice,
          profit: newOrderHistory.profit,
        }),
      });

      if (res.ok) {
        setHistory([...history, newOrderHistory]);
        setPnl(pnl + newOrderHistory.profit);
        setOrders(orders.filter((order) => order.id !== key));
        saveSessionData();
      } else {
        console.error("Failed to close operation");
      }
    } catch (error) {
      console.error("Error closing operation:", error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-[30%] h-full  py-5 gap-4">
      <h4>Precio actual: {currentPrice.toFixed(5)}</h4>
      <h5>P/L: {pnl.toFixed(2)}</h5>
      <h5>Unrealized P/L: {unrealizedPnl.toFixed(2)}</h5>
      <div className="flex flex-row g-4 h-8 items-center justify-center gap-4">
        <input
          value={orderSize}
          type="number"
          placeholder="Cantidad"
          onChange={(e) => {
            setOrderSize(e.target.value);
          }}
          className="p-4 rounded-md text-zinc-700"
        />
      </div>
      <div className="flex min-w-full items-center justify-evenly flex-row mt-2">
        <Button
          onClick={() => handleOrderSubmit("buy", parseFloat(orderSize))}
          color="primary"
        >
          BUY
        </Button>
        <Button
          onClick={() => handleOrderSubmit("sell", parseFloat(orderSize))}
          className="boton-sell"
          color="danger"
        >
          SELL
        </Button>
      </div>
      <div className="min-h-20 flex flex-col items-center justify-center min-w-full">
        {!fetchingPositions ? (
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Operación</th>
                <th>Cantidad</th>
                <th>Precio de entrada</th>
                <th>P/L</th>
                <th>Close</th>
              </tr>
            </thead>

            <tbody className="min-w-full">
              {orders.map((order) => {
                if (order != null) {
                  return (
                    <tr key={order.id}>
                      <td>{order.type.toUpperCase()}</td>
                      <td>{order.size}</td>
                      <td>{order.entryPrice.toFixed(5)}</td>
                      <td>
                        {currentPrice
                          ? (
                              (currentPrice - order.entryPrice) *
                              order.size *
                              (order.type === "buy" ? 1 : -1)
                            ).toFixed(5)
                          : "0"}
                      </td>
                      <td
                        className="flex justify-center items-center cursor-pointer"
                        onClick={closePosition(order.id)}
                      >
                        x
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
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
      <div className="min-h-20">
        <h4>Historial de operaciones</h4>
        {!fetchingPositions ? (
          <ul>
            {history.map((order) => {
              return (
                <li key={order.id}>
                  {order.type.toUpperCase()} {order.size} at{" "}
                  {order.entryPrice.toFixed(5)} - Close at{" "}
                  {order.exitPrice.toFixed(5)} - P/L: {order.profit.toFixed(5)}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p>Loading Positions...</p>
            <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
