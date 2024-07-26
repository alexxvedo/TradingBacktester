import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Checkbox } from "@nextui-org/checkbox";
import { CubeIcon } from "@heroicons/react/24/outline";

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
  const [tempStopLossPrice, setTempStopLossPrice] = useState(stopLossPrice);
  const [orderType, setOrderType] = useState("market");

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
    console.log(stopLossPrice, takeProfitPrice, orderType);
    const newOrder = {
      type,
      size,
      entryPrice: price || currentPrice,
      id: orders.length + 1,
      tp: takeProfitPrice ? takeProfitPrice : null,
      sl: stopLossPrice ? stopLossPrice : null,
      orderType: orderType,
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
        }),
      });

      if (res.ok) {
        const createdOrder = await res.json();
        setOrders([...orders, { ...newOrder, id: createdOrder.id }]);
        addPriceLines(createdOrder);

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

  const formatToFiveDigits = (num) => {
    return num ? num.toString().slice(0, 7) : "";
  };

  const calculateTpSl = (
    entryPrice,
    type,
    elementChanged,
    valueElementChanged,
  ) => {
    const pipValue = 0.0001;
    const orderSizeInUnits = orderSize * 100000;
    console.log(valueElementChanged);
    const value = parseFloat(valueElementChanged);

    switch (elementChanged) {
      case "stopLossValue":
        const slPriceFromValue =
          type === "BUY"
            ? entryPrice - value * pipValue
            : entryPrice + value * pipValue;
        setStopLossValue(value);
        setStopLossPrice(formatToFiveDigits(slPriceFromValue));
        setStopLossAmount(
          (value * pipValue * orderSizeInUnits * -1).toFixed(2),
        );
        setStopLossPercentage(
          (((value * pipValue) / entryPrice) * 100).toFixed(2),
        );
        break;

      case "stopLossPrice":
        const slValueFromPrice =
          type === "BUY"
            ? (entryPrice - value) / pipValue
            : (value - entryPrice) / pipValue;
        setStopLossValue(slValueFromPrice.toFixed(2));
        setStopLossPrice(formatToFiveDigits(value));
        setStopLossAmount(
          (slValueFromPrice * pipValue * orderSizeInUnits * -1).toFixed(2),
        );
        setStopLossPercentage(
          (((slValueFromPrice * pipValue) / entryPrice) * 100).toFixed(2),
        );
        break;

      case "stopLossAmount":
        const slValueFromAmount = Math.abs(value) / orderSizeInUnits / pipValue;
        const slPriceFromAmount =
          type === "BUY"
            ? entryPrice - slValueFromAmount * pipValue
            : entryPrice + slValueFromAmount * pipValue;
        setStopLossValue(slValueFromAmount.toFixed(2));
        setStopLossPrice(formatToFiveDigits(slPriceFromAmount));
        setStopLossAmount(value);
        setStopLossPercentage(
          (((slValueFromAmount * pipValue) / entryPrice) * 100).toFixed(2),
        );
        break;

      case "stopLossPercentage":
        const slValueFromPercentage = (value / 100) * (entryPrice / pipValue);
        const slPriceFromPercentage =
          type === "BUY"
            ? entryPrice - slValueFromPercentage * pipValue
            : entryPrice + slValueFromPercentage * pipValue;
        setStopLossValue(slValueFromPercentage.toFixed(2));
        setStopLossPrice(formatToFiveDigits(slPriceFromPercentage));
        setStopLossAmount(
          (slValueFromPercentage * pipValue * orderSizeInUnits * -1).toFixed(2),
        );
        setStopLossPercentage(value);
        break;

      case "takeProfitValue":
        const tpPriceFromValue =
          type === "BUY"
            ? entryPrice + value * pipValue
            : entryPrice - value * pipValue;
        setTakeProfitValue(value);
        setTakeProfitPrice(formatToFiveDigits(tpPriceFromValue));
        setTakeProfitAmount((value * pipValue * orderSizeInUnits).toFixed(2));
        setTakeProfitPercentage(
          (((value * pipValue) / entryPrice) * 100).toFixed(2),
        );
        break;

      case "takeProfitPrice":
        const tpValueFromPrice =
          type === "BUY"
            ? (value - entryPrice) / pipValue
            : (entryPrice - value) / pipValue;
        setTakeProfitValue(tpValueFromPrice.toFixed(2));
        setTakeProfitPrice(formatToFiveDigits(valueElementChanged)); // Mantén la cadena original para la edición
        setTakeProfitAmount(
          (tpValueFromPrice * pipValue * orderSizeInUnits).toFixed(2),
        );
        setTakeProfitPercentage(
          (((tpValueFromPrice * pipValue) / entryPrice) * 100).toFixed(2),
        );
        break;

      case "takeProfitAmount":
        const tpValueFromAmount = value / orderSizeInUnits / pipValue;
        const tpPriceFromAmount =
          type === "BUY"
            ? entryPrice + tpValueFromAmount * pipValue
            : entryPrice - tpValueFromAmount * pipValue;
        setTakeProfitValue(tpValueFromAmount.toFixed(2));
        setTakeProfitPrice(formatToFiveDigits(tpPriceFromAmount));
        setTakeProfitAmount(value);
        setTakeProfitPercentage(
          (((tpValueFromAmount * pipValue) / entryPrice) * 100).toFixed(2),
        );
        break;

      case "takeProfitPercentage":
        const tpValueFromPercentage = (value / 100) * (entryPrice / pipValue);
        const tpPriceFromPercentage =
          type === "BUY"
            ? entryPrice + tpValueFromPercentage * pipValue
            : entryPrice - tpValueFromPercentage * pipValue;
        setTakeProfitValue(tpValueFromPercentage.toFixed(2));
        setTakeProfitPrice(formatToFiveDigits(tpPriceFromPercentage));
        setTakeProfitAmount(
          (tpValueFromPercentage * pipValue * orderSizeInUnits).toFixed(2),
        );
        setTakeProfitPercentage(value);
        break;

      case "orderSize":
        const newOrderSize = value;
        if (stopLossValue) {
          const slPriceFromValue =
            type === "BUY"
              ? entryPrice - stopLossValue * pipValue
              : entryPrice + stopLossValue * pipValue;
          setStopLossPrice(formatToFiveDigits(slPriceFromValue));
          setStopLossAmount(
            (stopLossValue * pipValue * newOrderSize * 100000 * -1).toFixed(2),
          );
          setStopLossPercentage(
            (((stopLossValue * pipValue) / entryPrice) * 100).toFixed(2),
          );
        }
        if (takeProfitValue) {
          const tpPriceFromValue =
            type === "BUY"
              ? entryPrice + takeProfitValue * pipValue
              : entryPrice - takeProfitValue * pipValue;
          setTakeProfitPrice(formatToFiveDigits(tpPriceFromValue));
          setTakeProfitAmount(
            (takeProfitValue * pipValue * newOrderSize * 100000).toFixed(2),
          );
          setTakeProfitPercentage(
            (((takeProfitValue * pipValue) / entryPrice) * 100).toFixed(2),
          );
        }
        break;

      default:
        break;
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
          selectedKey={orderType}
          onSelectedTabChange={setOrderType}
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
                    calculateTpSl(
                      currentPrice,
                      positionType,
                      "orderSize",
                      e.target.value,
                    );
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
                    onChange={(e) => {
                      setStopLossValue(e.target.value);
                      calculateTpSl(
                        currentPrice,
                        positionType,
                        "stopLossValue",
                        e.target.value,
                      );
                    }}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossPrice}
                    onChange={(e) => {
                      setStopLossPrice(e.target.value);
                      calculateTpSl(
                        currentPrice,
                        positionType,
                        "stopLossPrice",
                        e.target.value,
                      );
                    }}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Permitir valores negativos, decimales y el símbolo "-" para números negativos
                      if (/^-?\d*\.?\d*$/.test(value)) {
                        setStopLossAmount(value);
                        if (!isNaN(parseFloat(value))) {
                          calculateTpSl(
                            currentPrice,
                            positionType,
                            "stopLossAmount",
                            parseFloat(value),
                          );
                        }
                      }
                    }}
                    label="$"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!stopLoss}
                    value={stopLossPercentage}
                    onChange={(e) => {
                      setStopLossPercentage(e.target.value);
                      calculateTpSl(
                        currentPrice,
                        positionType,
                        "stopLossPercentage",
                        e.target.value,
                      );
                    }}
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
                    onChange={(e) => {
                      setTakeProfitValue(e.target.value);
                      calculateTpSl(
                        currentPrice,
                        positionType,
                        "takeProfitValue",
                        e.target.value,
                      );
                    }}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitPrice}
                    onChange={(e) => {
                      var value = e.target.value;
                      setTakeProfitPrice(e.target.value);
                      if (!isNaN(parseFloat(e.target.value)) && value !== "-") {
                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "takeProfitPrice",
                          value,
                        );
                      }
                    }}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^-?\d*\.?\d*$/.test(value)) {
                        setTakeProfitAmount(value);
                        if (!isNaN(parseFloat(value))) {
                          calculateTpSl(
                            currentPrice,
                            positionType,
                            "takeProfitAmount",
                            parseFloat(value),
                          );
                        }
                      }
                    }}
                    label="$"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    isDisabled={!takeProfit}
                    value={takeProfitPercentage}
                    onChange={(e) => {
                      setTakeProfitPercentage(e.target.value);
                      calculateTpSl(
                        currentPrice,
                        positionType,
                        "takeProfitPercentage",
                        e.target.value,
                      );
                    }}
                    label="%"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
              </div>

              <Button
                onClick={() =>
                  handleOrderSubmit(
                    positionType.toLowerCase(),
                    parseFloat(orderSize * 100000),
                  )
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
