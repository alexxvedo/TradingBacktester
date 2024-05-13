import { Button } from "@nextui-org/button";
import React, { useEffect, useState, useRef } from "react";

export default function PositionCreator(props) {
  const [pnl, setPnl] = useState(0);
  const [unrealizedPnl, setUnrealizedPnl] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderSize, setOrderSize] = useState(100000);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setUnrealizedPnl(() => {
      let total = 0;
      orders.forEach((order) => {
        total +=
          (props.currentPrice - order.entryPrice) *
          order.size *
          (order.type === "buy" ? 1 : -1);
      });
      return total;
    });
  }, [props.currentPrice]);

  const handleOrderSubmit = (type, size) => {
    const newOrder = {
      type,
      size,
      entryPrice: props.currentPrice,
      id: orders.length + 1,
    };
    setOrders([...orders, newOrder]);
  };

  const closePosition = (key) => () => {
    // Cálculo del P/L
    const order = orders.find((order) => order.id === key);
    const newOrderHistory = {
      ...order,
      exitPrice: props.currentPrice,
      profit:
        (props.currentPrice - order.entryPrice) *
        order.size *
        (order.type === "buy" ? 1 : -1),
    };
    setHistory([...history, newOrderHistory]);
    setPnl(
      pnl +
        (props.currentPrice - order.entryPrice) *
          order.size *
          (order.type === "buy" ? 1 : -1)
    );

    setOrders(orders.filter((order) => order.id !== key));
  };

  return (
    <div className="flex flex-col items-center w-auto h-full justify-center py-5 gap-4">
      <h4>Precio actual: {props.currentPrice.toFixed(5)}</h4>
      <h5>P/L: {pnl.toFixed(2)}</h5>
      <h5>Unrealized P/L: {unrealizedPnl.toFixed(2)}</h5>
      <div className="flex flex-row g-4 h-8 items-center justify-center gap-4">
        <Button
          onClick={() => handleOrderSubmit("buy", parseFloat(orderSize))}
          color="primary"
        >
          Comprar
        </Button>
        <input
          value={orderSize}
          type="number"
          placeholder="Cantidad"
          onChange={(e) => {
            setOrderSize(e.target.value);
          }}
          className="p-2 rounded-lg"
        />
        <Button
          onClick={() => handleOrderSubmit("sell", parseFloat(orderSize))}
          className="boton-sell"
          color="danger"
        >
          Vender
        </Button>
      </div>
      <div className="min-h-20 flex flex-col items-center justify-center">
        <h3>Operaciones abiertas: </h3>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.type.toUpperCase()} {order.size} at{" "}
              {order.entryPrice.toFixed(5)}- P/L:{" "}
              {(
                (props.currentPrice - order.entryPrice) *
                order.size *
                (order.type === "buy" ? 1 : -1)
              ).toFixed(5)}
              <span
                className="cursor-pointer"
                onClick={closePosition(order.id)}
              >
                {" "}
                x Close
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-h-20">
        <h4>Historial de operaciones</h4>
        <ul>
          {history.map((order) => (
            <li key={order.id}>
              {order.type.toUpperCase()} {order.size} at{" "}
              {order.entryPrice.toFixed(5)} - Close at{" "}
              {order.exitPrice.toFixed(5)} - P/L: {order.profit.toFixed(5)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
