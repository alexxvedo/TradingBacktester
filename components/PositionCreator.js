import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
//import { Tabs, Tab } from "@nextui-org/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { CubeIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
}) {
  const [orderSize, setOrderSize] = useState("");
  const [limitPrice, setLimitPrice] = useState();
  const [ticks, setTicks] = useState("Ask + 10");
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

  const calculateTpSl = (
    entryPrice,
    type,
    elementChanged,
    valueElementChanged,
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
      },
    );

    console.log(result);

    const regex = /^\d*(\.\d{0,5})?$/;

    if (elementChanged.includes("stopLoss")) {
      setStopLossPrice(
        regex.test(result.stopLossPrice.toString())
          ? result.stopLossPrice.toString()
          : result.stopLossPrice.toString().split(".")[0] +
              "." +
              result.stopLossPrice.toString().split(".")[1].slice(0, 5),
      );
      setStopLossAmount(
        regex.test(result.stopLossAmount.toString())
          ? result.stopLossAmount.toString()
          : result.stopLossAmount.toString().split(".")[0] +
              "." +
              result.stopLossAmount.toString().split(".")[1].slice(0, 2),
      );
      setStopLossPercentage(
        regex.test(result.stopLossPercentage.toString())
          ? result.stopLossPercentage.toString()
          : result.stopLossPercentage.toString().split(".")[0] +
              "." +
              result.stopLossPercentage.toString().split(".")[1].slice(0, 3),
      );
      setStopLossValue(
        regex.test(result.stopLossValue.toString())
          ? result.stopLossValue.toString()
          : result.stopLossValue.toString().split(".")[0] +
              "." +
              result.stopLossValue.toString().split(".")[1].slice(0, 2),
      );
    } else if (elementChanged.includes("takeProfit")) {
      setTakeProfitPrice(
        regex.test(result.takeProfitPrice.toString())
          ? result.takeProfitPrice.toString()
          : result.takeProfitPrice.toString().split(".")[0] +
              "." +
              result.takeProfitPrice.toString().split(".")[1].slice(0, 5),
      );
      setTakeProfitAmount(
        regex.test(result.takeProfitAmount.toString())
          ? result.takeProfitAmount.toString()
          : result.takeProfitAmount.toString().split(".")[0] +
              "." +
              result.takeProfitAmount.toString().split(".")[1].slice(0, 2),
      );
      setTakeProfitPercentage(
        regex.test(result.takeProfitPercentage.toString())
          ? result.takeProfitPercentage.toString()
          : result.takeProfitPercentage.toString().split(".")[0] +
              "." +
              result.takeProfitPercentage.toString().split(".")[1].slice(0, 3),
      );
      setTakeProfitValue(
        regex.test(result.takeProfitValue)
          ? result.takeProfitValue
          : result.takeProfitValue.split(".")[0] +
              "." +
              result.takeProfitValue.toString().split(".")[1].slice(0, 2),
      );
    } else {
      if (stopLossAmount) {
        setStopLossAmount(
          regex.test(result.stopLossAmount.toString())
            ? result.stopLossAmount.toString()
            : result.stopLossAmount.toString().split(".")[0] +
                "." +
                result.stopLossAmount.toString().split(".")[1].slice(0, 2),
        );
      }
      if (stopLossPercentage) {
        setStopLossPercentage(
          regex.test(result.stopLossPercentage.toString())
            ? result.stopLossPercentage.toString()
            : result.stopLossPercentage.toString().split(".")[0] +
                "." +
                result.stopLossPercentage.toString().split(".")[1].slice(0, 3),
        );
      }
      if (takeProfitAmount) {
        setTakeProfitAmount(
          regex.test(result.takeProfitAmount.toString())
            ? result.takeProfitAmount.toString()
            : result.takeProfitAmount.toString().split(".")[0] +
                "." +
                result.takeProfitAmount.toString().split(".")[1].slice(0, 2),
        );
      }
      if (takeProfitPercentage) {
        setTakeProfitPercentage(
          regex.test(result.takeProfitPercentage.toString())
            ? result.takeProfitPercentage.toString()
            : result.takeProfitPercentage.toString().split(".")[0] +
                "." +
                result.takeProfitPercentage
                  .toString()
                  .split(".")[1]
                  .slice(0, 3),
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-w-full p-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-zinc-900">
      <div className="flex flex-col items-center justify-center  w-full ">
        <Tabs
          defaultValue="market"
          className=" flex flex-col items-center justify-center "
        >
          <TabsList className="grid grid-cols-2 w-[50%]">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
          </TabsList>
          <TabsContent
            value="market"
            className="max-w-full max-h-full flex flex-col gap-4 items-center justify-center p-4"
          >
            <div className="flex  flex-row justify-between h-[15%] w-full">
              <Button
                onClick={() => {
                  setPositionType("SELL");
                }}
                variant={`${positionType === "SELL" ? "sell" : "secondary"}`}
                className="w-full"
                size="lg"
              >
                SELL
              </Button>
              <Button
                onClick={() => {
                  setPositionType("BUY");
                }}
                variant={`${positionType === "BUY" ? "buy" : "secondary"}`}
                className="w-full"
                size="lg"
              >
                BUY
              </Button>
            </div>
            <div className="flex sm:flex-col sm:gap-4 sm:items-center sm:justify-center flex-row w-[40%]">
              <div className="flex flex-col w-full sm:items-center">
                <lable id="currentPrice" className="px-2 text-md font-bold">
                  Current Price
                </lable>
                <span
                  className="text-3xl font-bold text-center"
                  htmlFor="currentPrice"
                >
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
              <div className="flex flex-col w-full sm:items-center sm:text-center">
                <lable id="orderSize" className="px-2 text-md font-bold">
                  Order Size (Lots)
                </lable>
                <Input
                  htmlFor="orderSize"
                  value={orderSize || ""}
                  label="Lots"
                  type="text"
                  className=""
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setStopLossValue("");
                      return;
                    } else {
                      const regex = /^-?\d*(\.\d{0,2})?$/;
                      const validated = regex.test(e.target.value)
                        ? e.target.value
                        : e.target.value.slice(0, -1);
                      setOrderSize(validated);
                      calculateTpSl(
                        currentPrice,
                        positionType,
                        "orderSize",
                        validated,
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row min-w-full gap-4 justify-start items-center ">
              <div className="flex flex-col justify-between items-center  gap-2">
                <div className="flex w-full items-center justify-center gap-4">
                  <Checkbox
                    id="stopLoss"
                    onCheckedChange={(checked) => setStopLoss(checked)}
                  />
                  <label htmlFor="stopLoss">Stop Loss</label>
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="stopLossValue"
                    className={`px-2 text-md ${stopLoss ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    Pips
                  </lable>
                  <Input
                    htmlFor="stopLossValue"
                    disabled={!stopLoss}
                    value={stopLossValue || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setStopLossValue("");
                        return;
                      } else {
                        const regex = /^-?\d*(\.\d{0,2})?$/;

                        const validated = regex.test(e.target.value)
                          ? e.target.value
                          : e.target.value.slice(0, -1);
                        setStopLossValue(validated);

                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "stopLossValue",
                          validated,
                        );
                      }
                    }}
                    label="Pips"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="stopLossPrice"
                    className={`px-2 text-md ${stopLoss ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    Price
                  </lable>
                  <Input
                    htmlFor="stopLossPrice"
                    disabled={!stopLoss}
                    value={stopLossPrice || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setStopLossPrice("");
                        return;
                      } else {
                        const regex = /^-?\d*(\.\d{0,2})?$/;

                        const validated = regex.test(e.target.value)
                          ? e.target.value
                          : e.target.value.slice(0, -1);
                        setStopLossPrice(validated);
                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "stopLossPrice",
                          validated,
                        );
                      }
                    }}
                    label="Price"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="stopLossAmount"
                    className={`px-2 text-md ${stopLoss ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    $
                  </lable>
                  <Input
                    htmlFor="stopLossAmount"
                    disabled={!stopLoss}
                    value={stopLossAmount || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setStopLossAmount("");
                        return;
                      } else {
                        const regex = /^-?\d*(\.\d{0,2})?$/;

                        const validated = regex.test(e.target.value)
                          ? e.target.value
                          : e.target.value.slice(0, -1);
                        setStopLossAmount(validated);
                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "stopLossAmount",
                          validated,
                        );
                      }
                    }}
                    label="$"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="stopLossPercentage"
                    className={`px-2 text-md ${stopLoss ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    %
                  </lable>
                  <Input
                    htmlFor="stopLossPercentage"
                    disabled={!stopLoss}
                    value={stopLossPercentage || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setStopLossPercentage("");
                        return;
                      } else {
                        const regex = /^-?\d*(\.\d{0,2})?$/;

                        const validated = regex.test(e.target.value)
                          ? e.target.value
                          : e.target.value.slice(0, -1);
                        setStopLossPercentage(validated);
                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "stopLossPercentage",
                          validated,
                        );
                      }
                    }}
                    label="%"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between items-center  gap-2">
                <div className="flex w-full items-center justify-center gap-4">
                  <Checkbox
                    id="takeProfit"
                    onCheckedChange={(checked) => setTakeProfit(checked)}
                  />
                  <label htmlFor="stopLoss">Take Profit</label>
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="takeProfitValue"
                    className={`px-2 text-md ${takeProfit ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    Pips
                  </lable>
                  <Input
                    htmlFor="takeProfitValue"
                    disabled={!takeProfit}
                    value={takeProfitValue || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setTakeProfitValue("");
                        return;
                      } else {
                        setTakeProfitValue(e.target.value);
                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "takeProfitValue",
                          e.target.value,
                        );
                      }
                    }}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="takeProfitPrice"
                    className={`px-2 text-md ${takeProfit ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    Price
                  </lable>
                  <Input
                    htmlFor="takeProfitPrice"
                    disabled={!takeProfit}
                    value={takeProfitPrice || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setTakeProfitPrice("");
                        return;
                      } else {
                        var value = e.target.value;
                        setTakeProfitPrice(e.target.value);
                        if (
                          !isNaN(parseFloat(e.target.value)) &&
                          value !== "-"
                        ) {
                          calculateTpSl(
                            currentPrice,
                            positionType,
                            "takeProfitPrice",
                            value,
                          );
                        }
                      }
                    }}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="takeProfitAmount"
                    className={`px-2 text-md ${takeProfit ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    $
                  </lable>
                  <Input
                    htmlFor="takeProfitAmount"
                    disabled={!takeProfit}
                    value={takeProfitAmount || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setTakeProfitAmount("");
                        return;
                      } else {
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
                      }
                    }}
                    label="$"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <lable
                    id="takeProfitPercentage"
                    className={`px-2 text-md ${takeProfit ? "font-bold" : "font-bold opacity-25"} `}
                  >
                    %
                  </lable>
                  <Input
                    htmlFor="takeProfitPercentage"
                    disabled={!takeProfit}
                    value={takeProfitPercentage || ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setTakeProfitPercentage("");
                        return;
                      } else {
                        setTakeProfitPercentage(e.target.value);
                        calculateTpSl(
                          currentPrice,
                          positionType,
                          "takeProfitPercentage",
                          e.target.value,
                        );
                      }
                    }}
                    label="%"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() =>
                handleOrderSubmit(
                  positionType.toLowerCase(),
                  parseFloat(orderSize * 100000),
                )
              }
              variant={`${positionType === "BUY" ? "buy" : "sell"}`}
              color={positionType === "BUY" ? "primary" : "danger"}
              className="mt-4 w-full  "
            >
              {positionType === "BUY" ? "BUY" : "SELL"}
            </Button>
          </TabsContent>
          <TabsContent value="limit" className="w-full h-full">
            <div className="flex flex-col flex-w-full h-full py-4 gap-4">
              <div className="flex flex-row justify-between w-full h-[15%]">
                <Button
                  onClick={() => {
                    setPositionType("SELL");
                  }}
                  variant={`${positionType === "SELL" ? "sell" : "secondary"}`}
                  className="w-full"
                  size="lg"
                >
                  SELL
                </Button>
                <Button
                  onClick={() => {
                    setPositionType("BUY");
                  }}
                  variant={`${positionType === "BUY" ? "buy" : "secondary"}`}
                  className="w-full"
                  size="lg"
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
                    disabled={!stopLoss}
                    value={stopLossValue}
                    onChange={(e) => setStopLossValue(e.target.value)}
                    label="Pips"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    disabled={!stopLoss}
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    label="Price"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    disabled={!stopLoss}
                    value={stopLossAmount}
                    onChange={(e) => setStopLossAmount(e.target.value)}
                    label="$"
                    type="number"
                    variant="bordered"
                    size="sm"
                  />
                  <Input
                    disabled={!stopLoss}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
