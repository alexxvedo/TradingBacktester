import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Checkbox } from "@nextui-org/checkbox";

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
  const [limitPrice, setLimitPrice] = useState();
  const [ticks, setTicks] = useState("Ask + 10");
  const [stopLoss, setStopLoss] = useState(false);
  const [takeProfit, setTakeProfit] = useState(false);
  const [stopLossValue, setStopLossValue] = useState();
  const [stopLossPrice, setStopLossPrice] = useState();
  const [stopLossAmount, setStopLossAmount] = useState();
  const [stopLossPercentage, setStopLossPercentage] = useState();
  const [takeProfitValue, setTakeProfitValue] = useState();
  const [takeProfitPrice, setTakeProfitPrice] = useState();
  const [takeProfitAmount, setTakeProfitAmount] = useState();
  const [takeProfitPercentage, setTakeProfitPercentage] = useState();
  const [previousPrice, setPreviousPrice] = useState(0);
  const [priceColors, setPriceColors] = useState([]);
  const [positionType, setPositionType] = useState("BUY");

  useEffect(() => {
    const currentPriceStr = currentPrice.toFixed(5);
    const previousPriceStr = previousPrice;

    if (previousPrice !== currentPriceStr) {
      const newPriceColors = currentPriceStr.split("").map((digit, index) => {
        if (digit !== previousPriceStr[index]) {
          return digit > previousPriceStr[index]
            ? "text-blue-500"
            : "text-red-500";
        }
        return "";
      });

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
    }
  }, [currentPrice, previousPrice]);

  const handleOrderSubmit = async (type, size, price = null) => {
    const newOrder = {
      type,
      size,
      entryPrice: price || currentPrice,
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
    <div className="flex flex-col items-center justify-start min-w-full p-4 h-full">
      <div className="flex flex-col items-center justify-center gap-4 mb-4 w-full h-full ">
        <div className="flex items-center justify-center  w-full h-full">
          <span className="text-4xl font-bold text-center">
            {currentPrice
              .toFixed(5)
              .split("")
              .map((digit, index) => (
                <span key={index} className={priceColors[index] || ""}>
                  {digit}
                </span>
              ))}
          </span>
        </div>
        <Tabs
          aria-label="Position options"
          className=" items-center justify-center"
        >
          <Tab
            label="Mercado"
            title="Mercado"
            key="market"
            className="w-full h-full"
          >
            <div className="flex flex-col flex-w-full h-full p-4 gap-4">
              <div className="flex flex-row justify-between w-full h-[15%]">
                <Button
                  size="lg"
                  radius="sm"
                  color={positionType === "SELL" ? "danger" : "default"}
                  onClick={() => {
                    setPositionType("SELL");
                  }}
                  className="w-full"
                >
                  SELL
                </Button>
                <Button
                  color={positionType === "BUY" ? "primary" : "default"}
                  size="lg"
                  radius="sm"
                  onClick={() => {
                    setPositionType("BUY");
                  }}
                  className="w-full"
                >
                  BUY
                </Button>
              </div>
              <div className="flex w-full gap-1">
                <Input
                  value={currentPrice}
                  isReadOnly
                  label="Current Price"
                  type="number"
                  size="sm"
                  variant="underlined"
                  classNames=""
                  className="rounded-md text-zinc-200"
                />
                <Input
                  value={orderSize}
                  label="Lots"
                  type="number"
                  size="sm"
                  variant="underlined"
                  classNames=""
                  onChange={(e) => {
                    setOrderSize(e.target.value);
                  }}
                  className=" rounded-md text-zinc-200"
                />
              </div>
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col justify-between items-center mt-4 gap-2">
                  <Checkbox
                    label="Stop Loss"
                    isSelected={stopLoss}
                    onChange={(e) => setStopLoss(e.target.checked)}
                  >
                    Stop Loss
                  </Checkbox>
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossValue}
                    onChange={(e) => setStopLossValue(e.target.value)}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossAmount}
                    onChange={(e) => setStopLossAmount(e.target.value)}
                    label="$"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossPercentage}
                    onChange={(e) => setStopLossPercentage(e.target.value)}
                    label="%"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col justify-between items-center mt-4">
                  <Checkbox
                    label="Take Profit"
                    isSelected={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.checked)}
                  >
                    Take Profit
                  </Checkbox>
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitValue}
                    onChange={(e) => setStopLossValue(e.target.value)}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitAmount}
                    onChange={(e) => setStopLossAmount(e.target.value)}
                    label="$"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitPercentage}
                    onChange={(e) => setStopLossPercentage(e.target.value)}
                    label="%"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
              </div>

              <Button
                onClick={() =>
                  handleOrderSubmit("buy", parseFloat(orderSize * 100000))
                }
                color={positionType === "BUY" ? "primary" : "danger"}
                className="mt-4"
                radius="sm"
              >
                {positionType === "BUY" ? "BUY" : "SELL"}
              </Button>
            </div>
          </Tab>
          <Tab
            label="Límite"
            title="Límite"
            key="limit"
            className="w-full h-full"
          >
            <div className="flex flex-col flex-w-full h-full p-4 gap-4">
              <div className="flex flex-row justify-between w-full h-[15%]">
                <Button
                  size="lg"
                  radius="sm"
                  color={positionType === "SELL" ? "danger" : "default"}
                  onClick={() => {
                    setPositionType("SELL");
                  }}
                  className="w-full"
                >
                  SELL
                </Button>
                <Button
                  color={positionType === "BUY" ? "primary" : "default"}
                  size="lg"
                  radius="sm"
                  onClick={() => {
                    setPositionType("BUY");
                  }}
                  className="w-full"
                >
                  BUY
                </Button>
              </div>
              <div className="flex w-full gap-1">
                <Input
                  value={limitPrice}
                  label="Entry price"
                  type="number"
                  size="sm"
                  variant="underlined"
                  classNames=""
                  className="rounded-md text-zinc-200"
                />
                <Input
                  value={orderSize}
                  label="Lots"
                  type="number"
                  size="sm"
                  variant="underlined"
                  classNames=""
                  onChange={(e) => {
                    setOrderSize(e.target.value);
                  }}
                  className=" rounded-md text-zinc-200"
                />
              </div>

              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col justify-between items-center mt-4 gap-2">
                  <Checkbox
                    label="Stop Loss"
                    isSelected={stopLoss}
                    onChange={(e) => setStopLoss(e.target.checked)}
                  >
                    Stop Loss
                  </Checkbox>
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossValue}
                    onChange={(e) => setStopLossValue(e.target.value)}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossAmount}
                    onChange={(e) => setStopLossAmount(e.target.value)}
                    label="$"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossPercentage}
                    onChange={(e) => setStopLossPercentage(e.target.value)}
                    label="%"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col justify-between items-center mt-4">
                  <Checkbox
                    label="Take Profit"
                    isSelected={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.checked)}
                  >
                    Take Profit
                  </Checkbox>
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitValue}
                    onChange={(e) => setStopLossValue(e.target.value)}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitAmount}
                    onChange={(e) => setStopLossAmount(e.target.value)}
                    label="$"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitPercentage}
                    onChange={(e) => setStopLossPercentage(e.target.value)}
                    label="%"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
              </div>

              <Button
                onClick={() =>
                  handleOrderSubmit("buy", parseFloat(orderSize * 100000))
                }
                color={positionType === "BUY" ? "primary" : "danger"}
                className="mt-4"
                radius="sm"
              >
                {positionType === "BUY" ? "BUY" : "SELL"}
              </Button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
