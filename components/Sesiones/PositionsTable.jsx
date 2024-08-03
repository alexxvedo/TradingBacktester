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
import { useState, useEffect, useCallback } from "react";
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
  currentCandle,
}) {
  const [editingOrder, setEditingOrder] = useState(null);

  const closePosition = useCallback(
    async (key, exitPrice) => {
      const order = orders.find((order) => order.id === key);

      const newOrder = {
        ...order,
        exitPrice: parseFloat(exitPrice),
        profit:
          (exitPrice - order.entryPrice) *
          order.size *
          (order.type === "buy" ? 1 : -1),
        exitDate: new Date(currentCandleDate * 1000),
      };

      try {
        const res = await fetch(`/api/operations/${key}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: newOrder,
            type: "close",
          }),
        });

        if (res.ok) {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== key),
          );
          setHistory((prevHistory) => [...prevHistory, newOrder]);
          saveSessionData();

          // Eliminar los price lines relacionados con la posición cerrada
          const updatedPriceLines = [];
          priceLines.forEach((priceLine) => {
            if (
              priceLine._private__priceLine._private__options.positionId === key
            ) {
              lineSeries.removePriceLine(priceLine);
            } else {
              updatedPriceLines.push(priceLine);
            }
          });

          setPriceLines(updatedPriceLines);
        } else {
          console.error("Failed to close operation");
        }
      } catch (error) {
        console.error("Error closing operation:", error);
      }
    },
    [orders, saveSessionData, currentCandleDate, lineSeries, priceLines],
  );

  useEffect(() => {
    if (!currentCandle) return;

    console.log("Comprobando sl tp");
    const ordersToClose = [];

    orders.forEach((order) => {
      if (order.type === "buy") {
        if (order.sl >= currentCandle.low) {
          ordersToClose.push({ id: order.id, price: order.sl });
        } else if (order.tp <= currentCandle.high) {
          ordersToClose.push({ id: order.id, price: order.tp });
        }
      } else {
        if (order.sl <= currentCandle.high) {
          ordersToClose.push({ id: order.id, price: order.sl });
        } else if (order.tp >= currentCandle.low) {
          ordersToClose.push({ id: order.id, price: order.tp });
        }
      }
    });

    ordersToClose.forEach(({ id, price }) => {
      closePosition(id, price);
    });
  }, [currentCandle]);

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
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o.id === order.id ? order : o)),
        );
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
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, [field]: value } : order,
      ),
    );
  };

  const updatePriceLine = (order, lineType) => {
    const orderId = order.id;
    setPriceLines((prevPriceLines) => {
      const newPriceLines = prevPriceLines.filter(
        (priceLine) =>
          !(
            priceLine._private__priceLine._private__options.positionId ===
              orderId &&
            priceLine._private__priceLine._private__options.lineType ===
              lineType
          ),
      );
      const newPriceLine = {
        ...priceLine._private__priceLine._private__options,
        price: lineType === "tp" ? parseFloat(order.tp) : parseFloat(order.sl),
        title: lineType === "tp" ? "TP @ " + order.tp : "SL @ " + order.sl,
      };
      lineSeries.removePriceLine(priceLine);
      const finalPriceLine = lineSeries.createPriceLine(newPriceLine);
      return [...newPriceLines, finalPriceLine];
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
      {orders && orders.length ? (
        <TableBody className="max-h-full">
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
                  onClick={() => closePosition(order.id, currentPrice)}
                >
                  Close
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
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
