import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketTab from "@/components/Sesiones/PositionCreator/MarketTab";
import LimitTab from "@/components/Sesiones/PositionCreator/LimitTab";
import SettingsTab from "@/components/Sesiones/PositionCreator/SettingsTab";
import pipCalculator from "@/utils/Sesiones/pipCalculator";

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
  addPriceLines,
  pair,
  chartColors,
  setChartColors,
  resetDefaultChartColors,
}) {
  const [orderSize, setOrderSize] = useState("");
  const [limitPrice, setLimitPrice] = useState();
  const [stopLoss, setStopLoss] = useState(false);
  const [takeProfit, setTakeProfit] = useState(false);
  const [stopLossValue, setStopLossValue] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [stopLossAmount, setStopLossAmount] = useState("");
  const [stopLossPercentage, setStopLossPercentage] = useState("");
  const [takeProfitValue, setTakeProfitValue] = useState("");
  const [takeProfitPrice, setTakeProfitPrice] = useState("");
  const [takeProfitAmount, setTakeProfitAmount] = useState("");
  const [takeProfitPercentage, setTakeProfitPercentage] = useState("");
  const [priceColors, setPriceColors] = useState([]);
  const [positionType, setPositionType] = useState("BUY");
  const [orderType, setOrderType] = useState("market");
  const [spread, setSpread] = useState(0);
  const [previousPrice, setPreviousPrice] = useState(currentPrice.toFixed(5));

  const handleColorChange = (setter) => (color) => setter(color);
  const handleSpreadChange = (e) => setSpread(parseFloat(e.target.value));

  const handleOrderSubmit = async (type, size, price = null) => {
    const newOrder = {
      type,
      size,
      entryPrice: price || currentPrice,
      id: orders.length + 1,
      tp: takeProfitPrice ? takeProfitPrice : null,
      sl: stopLossPrice ? stopLossPrice : null,
      orderType: orderType,
      entryDate: currentCandleDate,
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
          tp: takeProfitPrice ? takeProfitPrice : null,
          sl: stopLossPrice ? stopLossPrice : null,
          orderType: orderType,
          entryDate: currentCandleDate,
        }),
      });

      if (res.ok) {
        const createdOrder = await res.json();
        setOrders([...orders, { ...newOrder, id: createdOrder.id }]);
        addPriceLines(createdOrder);

        setMarkers((prevMarkers) => {
          const existingMarkerIndex = prevMarkers.findIndex(
            (marker) => marker.time === currentCandleDate
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
        setOrders(orders.filter((order) => order !== newOrder));
        console.error("Failed to create operation", res.error);
      }
    } catch (error) {
      setOrders(orders.filter((order) => order !== newOrder));
      console.error("Error creating operation:", error);
    }
  };

  const calculateTpSl = (
    entryPrice,
    type,
    elementChanged,
    valueElementChanged
  ) => {
    const orderSizeInUnits =
      elementChanged !== "orderSize"
        ? orderSize * 100000
        : valueElementChanged * 100000;
    const value = parseFloat(valueElementChanged);

    const result = pipCalculator(
      entryPrice,
      orderSizeInUnits,
      elementChanged,
      value,
      type,
      pair,
      {
        stopLossValue: stopLossValue,
        takeProfitValue: takeProfitValue,
      }
    );

    const regex = /^\d*(\.\d{0,5})?$/;

    if (elementChanged.includes("stopLoss")) {
      setStopLossPrice(
        regex.test(result.stopLossPrice.toString())
          ? result.stopLossPrice.toString()
          : result.stopLossPrice.toString().split(".")[0] +
              "." +
              result.stopLossPrice.toString().split(".")[1].slice(0, 5)
      );
      setStopLossAmount(
        regex.test(result.stopLossAmount.toString())
          ? result.stopLossAmount.toString()
          : result.stopLossAmount.toString().split(".")[0] +
              "." +
              result.stopLossAmount.toString().split(".")[1].slice(0, 2)
      );
      setStopLossPercentage(
        regex.test(result.stopLossPercentage.toString())
          ? result.stopLossPercentage.toString()
          : result.stopLossPercentage.toString().split(".")[0] +
              "." +
              result.stopLossPercentage.toString().split(".")[1].slice(0, 3)
      );
      setStopLossValue(
        regex.test(result.stopLossValue.toString())
          ? result.stopLossValue.toString()
          : result.stopLossValue.toString().split(".")[0] +
              "." +
              result.stopLossValue.toString().split(".")[1].slice(0, 2)
      );
    } else if (elementChanged.includes("takeProfit")) {
      setTakeProfitPrice(
        regex.test(result.takeProfitPrice.toString())
          ? result.takeProfitPrice.toString()
          : result.takeProfitPrice.toString().split(".")[0] +
              "." +
              result.takeProfitPrice.toString().split(".")[1].slice(0, 5)
      );
      setTakeProfitAmount(
        regex.test(result.takeProfitAmount.toString())
          ? result.takeProfitAmount.toString()
          : result.takeProfitAmount.toString().split(".")[0] +
              "." +
              result.takeProfitAmount.toString().split(".")[1].slice(0, 2)
      );
      setTakeProfitPercentage(
        regex.test(result.takeProfitPercentage.toString())
          ? result.takeProfitPercentage.toString()
          : result.takeProfitPercentage.toString().split(".")[0] +
              "." +
              result.takeProfitPercentage.toString().split(".")[1].slice(0, 3)
      );
      setTakeProfitValue(
        regex.test(result.takeProfitValue)
          ? result.takeProfitValue
          : result.takeProfitValue.split(".")[0] +
              "." +
              result.takeProfitValue.toString().split(".")[1].slice(0, 2)
      );
    } else {
      if (stopLossAmount) {
        setStopLossAmount(
          regex.test(result.stopLossAmount.toString())
            ? result.stopLossAmount.toString()
            : result.stopLossAmount.toString().split(".")[0] +
                "." +
                result.stopLossAmount.toString().split(".")[1].slice(0, 2)
        );
      }
      if (stopLossPercentage) {
        setStopLossPercentage(
          regex.test(result.stopLossPercentage.toString())
            ? result.stopLossPercentage.toString()
            : result.stopLossPercentage.toString().split(".")[0] +
                "." +
                result.stopLossPercentage.toString().split(".")[1].slice(0, 3)
        );
      }
      if (takeProfitAmount) {
        setTakeProfitAmount(
          regex.test(result.takeProfitAmount.toString())
            ? result.takeProfitAmount.toString()
            : result.takeProfitAmount.toString().split(".")[0] +
                "." +
                result.takeProfitAmount.toString().split(".")[1].slice(0, 2)
        );
      }
      if (takeProfitPercentage) {
        setTakeProfitPercentage(
          regex.test(result.takeProfitPercentage.toString())
            ? result.takeProfitPercentage.toString()
            : result.takeProfitPercentage.toString().split(".")[0] +
                "." +
                result.takeProfitPercentage.toString().split(".")[1].slice(0, 3)
        );
      }
    }
  };

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

  return (
    <div className="flex flex-col items-center justify-start min-w-full p-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-zinc-900">
      <div className="flex flex-col items-center justify-center  w-full ">
        <Tabs
          defaultValue="market"
          className=" flex flex-col items-center justify-center "
        >
          <TabsList className="grid grid-cols-3 w-[80%]">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <MarketTab
              currentPrice={currentPrice}
              positionType={positionType}
              setPositionType={setPositionType}
              orderSize={orderSize}
              setOrderSize={setOrderSize}
              calculateTpSl={calculateTpSl}
              handleOrderSubmit={handleOrderSubmit}
              stopLoss={stopLoss}
              setStopLoss={setStopLoss}
              stopLossValue={stopLossValue}
              setStopLossValue={setStopLossValue}
              stopLossPrice={stopLossPrice}
              setStopLossPrice={setStopLossPrice}
              stopLossAmount={stopLossAmount}
              setStopLossAmount={setStopLossAmount}
              stopLossPercentage={stopLossPercentage}
              setStopLossPercentage={setStopLossPercentage}
              takeProfit={takeProfit}
              setTakeProfit={setTakeProfit}
              takeProfitValue={takeProfitValue}
              setTakeProfitValue={setTakeProfitValue}
              takeProfitPrice={takeProfitPrice}
              setTakeProfitPrice={setTakeProfitPrice}
              takeProfitAmount={takeProfitAmount}
              setTakeProfitAmount={setTakeProfitAmount}
              takeProfitPercentage={takeProfitPercentage}
              setTakeProfitPercentage={setTakeProfitPercentage}
              priceColors={priceColors}
            />
          </TabsContent>

          <TabsContent value="limit">
            <LimitTab
              currentPrice={currentPrice}
              positionType={positionType}
              setPositionType={setPositionType}
              orderSize={orderSize}
              setOrderSize={setOrderSize}
              limitPrice={limitPrice}
              setLimitPrice={setLimitPrice}
              calculateTpSl={calculateTpSl}
              handleOrderSubmit={handleOrderSubmit}
              stopLoss={stopLoss}
              setStopLoss={setStopLoss}
              stopLossValue={stopLossValue}
              setStopLossValue={setStopLossValue}
              stopLossPrice={stopLossPrice}
              setStopLossPrice={setStopLossPrice}
              stopLossAmount={stopLossAmount}
              setStopLossAmount={setStopLossAmount}
              stopLossPercentage={setStopLossPercentage}
              setStopLossPercentage={setStopLossPercentage}
              takeProfit={takeProfit}
              setTakeProfit={setTakeProfit}
              takeProfitValue={takeProfitValue}
              setTakeProfitValue={setTakeProfitValue}
              takeProfitPrice={takeProfitPrice}
              setTakeProfitPrice={setTakeProfitPrice}
              takeProfitAmount={takeProfitAmount}
              setTakeProfitAmount={setTakeProfitAmount}
              takeProfitPercentage={takeProfitPercentage}
              setTakeProfitPercentage={setTakeProfitPercentage}
              priceColors={priceColors}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab
              chartColors={chartColors}
              setChartColors={setChartColors}
              resetDefaultChartColors={resetDefaultChartColors}
              handleColorChange={handleColorChange}
              spread={spread}
              handleSpreadChange={handleSpreadChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
