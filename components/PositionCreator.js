import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

export default function PositionCreator({
  currentPrice,
  currentBalance,
  saveSessionData,
  sessionId,
  orders,
  setOrders,
  markers,
  setMarkers,
  currentCandleDate,
}) {
  const [orderSize, setOrderSize] = useState();
  const [history, setHistory] = useState([]);
  const [fetchingPositions, setFetchingPositions] = useState(true);
  const [previousPrice, setPreviousPrice] = useState(currentPrice.toFixed(5));
  const [priceColors, setPriceColors] = useState(Array(10).fill(""));

  useEffect(() => {
    const currentPriceStr = currentPrice.toFixed(5);
    const previousPriceStr = previousPrice;

    const newPriceColors = currentPriceStr.split("").map((digit, index) => {
      if (digit !== previousPriceStr[index]) {
        return digit > previousPriceStr[index]
          ? "text-blue-500"
          : "text-red-500";
      }
      return "";
    });

    // Apply the same color to all subsequent digits if a change is detected
    let colorToApply = "";
    for (let i = 0; i < newPriceColors.length; i++) {
      if (newPriceColors[i] !== "") {
        colorToApply = newPriceColors[i];
        break;
      }
    }
    const finalPriceColors = newPriceColors.map((color) => {
      if (color !== colorToApply && color !== "") {
        return colorToApply;
      }
      return color;
    });

    setPriceColors(finalPriceColors);
    setPreviousPrice(currentPriceStr);
  }, [currentPrice]);

  const handleOrderSubmit = async (type, size) => {
    console.log("Size:", size);
    const newOrder = {
      type,
      size,
      entryPrice: currentPrice,
      id: orders.length + 1,
    };
    setOrders([...orders, { ...newOrder }]);

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
        setMarkers((prevMarkers) => {
          const existingMarkerIndex = prevMarkers.findIndex(
            (marker) => marker.time === currentCandleDate,
          );

          if (existingMarkerIndex !== -1) {
            const updatedMarkers = [...prevMarkers];
            updatedMarkers[existingMarkerIndex].size += newOrder.size / 100000;
            return updatedMarkers;
          } else {
            return [
              ...prevMarkers,
              {
                time: currentCandleDate,
                value: currentPrice,
                type: createdOrder.type,
                size: createdOrder.size / 100000,
              },
            ];
          }
        });

        saveSessionData();
      } else {
        setOrders(orders.filter((order) => order == newOrder));
        console.error("Failed to create operation", res.error);
      }
    } catch (error) {
      setOrders(orders.filter((order) => order == newOrder));

      console.error("Error creating operation:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-full">
      <div className="flex flex-col items-center justify-center gap-4 mb-4 gap-4">
        <div className="text-5xl font-bold flex">
          {currentPrice
            .toFixed(5)
            .split("")
            .map((digit, index) => (
              <span key={index} className={priceColors[index]}>
                {digit}
              </span>
            ))}
        </div>
        <Input
          value={orderSize}
          label="Quantity (Lots)"
          type="number"
          classNames="max-w-full"
          onChange={(e) => {
            setOrderSize(e.target.value);
          }}
          className="p-4 rounded-md text-zinc-200"
        />
      </div>
      <div className="flex min-w-full items-center justify-evenly flex-row mt-2">
        <Button
          onClick={() =>
            handleOrderSubmit("buy", parseFloat(orderSize * 100000))
          }
          color="primary"
        >
          BUY
        </Button>
        <Button
          onClick={() =>
            handleOrderSubmit("sell", parseFloat(orderSize * 100000))
          }
          className="boton-sell"
          color="danger"
        >
          SELL
        </Button>
      </div>
    </div>
  );
}
