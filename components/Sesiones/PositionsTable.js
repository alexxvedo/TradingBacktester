//import { Table,   TableHeader,  TableRow,  TableColumn,  TableBody,  TableCell,} from "@nextui-org/table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

export default function PositionsTable({
  orders,
  setOrders,
  history,
  setHistory,
  currentPrice,
  saveSessionData,
  accountSize,
  lineSeries,
  priceLines,
  setPriceLines,
  currentCandleDate,
}) {
  const [editingOrder, setEditingOrder] = useState(null);

  const closePosition = (key) => async () => {
    const order = orders.find((order) => order.id === key);

    const newOrder = {
      ...order,
      exitPrice: currentPrice,
      profit:
        (currentPrice - order.entryPrice) *
        order.size *
        (order.type === "buy" ? 1 : -1),
      exitDate: currentCandleDate,
    };
    setHistory([...history, newOrder]);

    try {
      const res = await fetch(`/api/operations/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            ...newOrder,
            exitPrice: newOrder.exitPrice,
            profit: newOrder.profit,
            accountSize,
            takeProfit: order.takeProfit,
            stopLoss: order.stopLoss,
            exitDate: newOrder.exitDate,
          },
          type: "close",
        }),
      });

      if (res.ok) {
        setOrders([...orders.filter((order) => order.id !== key)]);
        setHistory([...history, newOrder]);
        saveSessionData();
        priceLines.map((priceLine) => {
          console.log(priceLine);
          if (
            priceLine._private__priceLine._private__options.positionId === key
          ) {
            console.log("Removing price line");
            console.log(lineSeries);
            lineSeries.removePriceLine(priceLine);
          }
        });
        setPriceLines(
          priceLines.filter(
            (priceLine) =>
              priceLine._private__priceLine._private__options.positionId !==
              key,
          ),
        );
      } else {
        console.error("Failed to close operation");
      }
    } catch (error) {
      console.error("Error closing operation:", error);
    }
  };

  const handleEdit = (order) => () => {
    setEditingOrder(order.id);
  };

  const handleSave = async (order) => {
    try {
      const res = await fetch(`/api/operations/${order.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: order, type: "update" }),
      });

      if (res.ok) {
        const updatedOrders = orders.map((o) =>
          o.id === order.id ? order : o,
        );
        setOrders(updatedOrders);
        setEditingOrder(null);
        saveSessionData();
      } else {
        console.error("Failed to update operation");
      }
    } catch (error) {
      console.error("Error updating operation:", error);
    }
  };

  const handleChange = (orderId, field) => (e) => {
    const value = e.target.value;
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, [field]: value } : order,
    );
    setOrders(updatedOrders);
  };

  const updatePriceLine = (order, lineType) => {
    const orderId = order.id;
    priceLines.map((priceLine) => {
      if (
        priceLine._private__priceLine._private__options.positionId ===
          orderId &&
        priceLine._private__priceLine._private__options.lineType === lineType
      ) {
        var newPriceLine = {
          ...priceLine._private__priceLine._private__options,
          price:
            lineType === "tp" ? parseFloat(order.tp) : parseFloat(order.sl),
          title: lineType === "tp" ? "TP @ " + order.tp : "SL @ " + order.sl,
        };

        lineSeries.removePriceLine(priceLine);

        const finalPriceLine = lineSeries.createPriceLine(newPriceLine);

        const newPriceLines = priceLines.filter((priceLine) => {
          return !(
            priceLine._private__priceLine._private__options.positionId ===
              orderId &&
            priceLine._private__priceLine._private__options.lineType ===
              lineType
          );
        });
        setPriceLines([...newPriceLines, finalPriceLine]);
      }
    });
  };

  return (
    <Table aria-label="Position Table" className="h-full max-h-full">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Entry Price</TableHead>
          <TableHead>Current Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>TP</TableHead>
          <TableHead>SL</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {orders != undefined && orders.length != 0 && (
        <TableBody className="max-h-full]">
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>
                {`${new Date(order.entryDate).toLocaleDateString()}, ${new Date(order.entryDate).toLocaleTimeString()}`}
              </TableCell>
              <TableCell>{order.type.toUpperCase()}</TableCell>
              <TableCell>{order.entryPrice.toFixed(4)}</TableCell>
              <TableCell>{currentPrice.toFixed(4)}</TableCell>
              <TableCell>{order.size / 100000}</TableCell>
              <TableCell>
                {editingOrder === order.id ? (
                  <Input
                    value={order.tp}
                    onChange={handleChange(order.id, "tp")}
                    variant="underlined"
                    onBlur={() => {
                      updatePriceLine(order, "tp");
                      handleSave(order);
                      setEditingOrder(!editingOrder);
                    }}
                    size="sm"
                    className="max-w-[100px]"
                  />
                ) : (
                  <div className="flex items-center">
                    {order.tp}
                    <PencilIcon
                      className="w-4 h-4 ml-2 cursor-pointer"
                      onClick={handleEdit(order)}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>
                {editingOrder === order.id ? (
                  <Input
                    value={order.sl}
                    onChange={handleChange(order.id, "sl")}
                    variant="underlined"
                    onBlur={() => {
                      updatePriceLine(order, "sl");

                      handleSave(order);
                      setEditingOrder(!editingOrder);
                    }}
                    size="sm"
                    className="max-w-[100px]"
                  />
                ) : (
                  <div className="flex items-center">
                    {order.sl}
                    <PencilIcon
                      className="w-4 h-4 ml-2 cursor-pointer"
                      onClick={handleEdit(order)}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell
                className={
                  (currentPrice - order.entryPrice) *
                    order.size *
                    (order.type === "buy" ? 1 : -1) >=
                  0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {(
                  (currentPrice - order.entryPrice) *
                  order.size *
                  (order.type === "buy" ? 1 : -1)
                ).toFixed(2)}
              </TableCell>
              <TableCell className="cursor-pointer">
                <Button
                  variant="flat"
                  color="danger"
                  onClick={closePosition(order.id)}
                >
                  Close
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
      {(orders === undefined || orders.length === 0) && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No positions to show
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
