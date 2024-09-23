import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function MarketTab({
  currentPrice,
  positionType,
  setPositionType,
  orderSize,
  setOrderSize,
  calculateTpSl,
  handleOrderSubmit,
  stopLoss,
  setStopLoss,
  stopLossValue,
  setStopLossValue,
  stopLossPrice,
  setStopLossPrice,
  stopLossAmount,
  setStopLossAmount,
  stopLossPercentage,
  setStopLossPercentage,
  takeProfit,
  setTakeProfit,
  takeProfitValue,
  setTakeProfitValue,
  takeProfitPrice,
  setTakeProfitPrice,
  takeProfitAmount,
  setTakeProfitAmount,
  takeProfitPercentage,
  setTakeProfitPercentage,
  priceColors,
}) {
  return (
    <div className="max-w-full max-h-full flex flex-col gap-4 items-center justify-center p-4">
      <div className="flex flex-row justify-between h-[15%] w-full">
        <Button
          onClick={() => setPositionType("SELL")}
          variant={`${positionType === "SELL" ? "sell" : "secondary"}`}
          className="w-full"
          size="lg"
        >
          SELL
        </Button>
        <Button
          onClick={() => setPositionType("BUY")}
          variant={`${positionType === "BUY" ? "buy" : "secondary"}`}
          className="w-full"
          size="lg"
        >
          BUY
        </Button>
      </div>
      <div className="flex sm:flex-col sm:gap-4 sm:items-center sm:justify-center flex-row w-[40%]">
        <div className="flex flex-col w-full sm:items-center">
          <label id="currentPrice" className="px-2 text-md font-bold">
            Current Price
          </label>
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
          <label id="orderSize" className="px-2 text-md font-bold">
            Order Size (Lots)
          </label>
          <Input
            htmlFor="orderSize"
            value={orderSize || ""}
            label="Lots"
            type="text"
            className=""
            onChange={(e) => {
              const regex = /^-?\d*(\.\d{0,2})?$/;
              const validated = regex.test(e.target.value)
                ? e.target.value
                : e.target.value.slice(0, -1);
              setOrderSize(validated);
              calculateTpSl(currentPrice, positionType, "orderSize", validated);
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
            <label
              id="stopLossValue"
              className={`px-2 text-md ${
                stopLoss ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              Pips
            </label>
            <Input
              htmlFor="stopLossValue"
              disabled={!stopLoss}
              value={stopLossValue || ""}
              onChange={(e) => {
                const regex = /^-?\d*(\.\d{0,2})?$/;
                const validated = regex.test(e.target.value)
                  ? e.target.value
                  : e.target.value.slice(0, -1);
                setStopLossValue(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "stopLossValue",
                  validated
                );
              }}
              label="Pips"
              type="text"
              variant="bordered"
              size="sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              id="stopLossPrice"
              className={`px-2 text-md ${
                stopLoss ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              Price
            </label>
            <Input
              htmlFor="stopLossPrice"
              disabled={!stopLoss}
              value={stopLossPrice || ""}
              onChange={(e) => {
                const regex = /^-?\d*(\.\d{0,5})?$/;
                const validated = regex.test(e.target.value)
                  ? e.target.value
                  : e.target.value.slice(0, -1);
                setStopLossPrice(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "stopLossPrice",
                  validated
                );
              }}
              label="Price"
              type="text"
              variant="bordered"
              size="sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              id="stopLossAmount"
              className={`px-2 text-md ${
                stopLoss ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              $
            </label>
            <Input
              htmlFor="stopLossAmount"
              disabled={!stopLoss}
              value={stopLossAmount || ""}
              onChange={(e) => {
                const regex = /^-?\d*(\.\d{0,2})?$/;
                const validated = regex.test(e.target.value)
                  ? e.target.value
                  : e.target.value.slice(0, -1);
                setStopLossAmount(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "stopLossAmount",
                  validated
                );
              }}
              label="$"
              type="text"
              variant="bordered"
              size="sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              id="stopLossPercentage"
              className={`px-2 text-md ${
                stopLoss ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              %
            </label>
            <Input
              htmlFor="stopLossPercentage"
              disabled={!stopLoss}
              value={stopLossPercentage || ""}
              onChange={(e) => {
                const regex = /^-?\d*(\.\d{0,2})?$/;
                const validated = regex.test(e.target.value)
                  ? e.target.value
                  : e.target.value.slice(0, -1);
                setStopLossPercentage(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "stopLossPercentage",
                  validated
                );
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
            <label htmlFor="takeProfit">Take Profit</label>
          </div>
          <div className="flex flex-col w-full">
            <label
              id="takeProfitValue"
              className={`px-2 text-md ${
                takeProfit ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              Pips
            </label>
            <Input
              htmlFor="takeProfitValue"
              disabled={!takeProfit}
              value={takeProfitValue || ""}
              onChange={(e) => {
                const validated = e.target.value;
                setTakeProfitValue(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "takeProfitValue",
                  validated
                );
              }}
              label="Pips"
              type="text"
              variant="bordered"
              size="sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              id="takeProfitPrice"
              className={`px-2 text-md ${
                takeProfit ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              Price
            </label>
            <Input
              htmlFor="takeProfitPrice"
              disabled={!takeProfit}
              value={takeProfitPrice || ""}
              onChange={(e) => {
                const validated = e.target.value;
                setTakeProfitPrice(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "takeProfitPrice",
                  validated
                );
              }}
              label="Price"
              type="text"
              variant="bordered"
              size="sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              id="takeProfitAmount"
              className={`px-2 text-md ${
                takeProfit ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              $
            </label>
            <Input
              htmlFor="takeProfitAmount"
              disabled={!takeProfit}
              value={takeProfitAmount || ""}
              onChange={(e) => {
                const validated = e.target.value;
                setTakeProfitAmount(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "takeProfitAmount",
                  validated
                );
              }}
              label="$"
              type="text"
              variant="bordered"
              size="sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              id="takeProfitPercentage"
              className={`px-2 text-md ${
                takeProfit ? "font-bold" : "font-bold opacity-25"
              } `}
            >
              %
            </label>
            <Input
              htmlFor="takeProfitPercentage"
              disabled={!takeProfit}
              value={takeProfitPercentage || ""}
              onChange={(e) => {
                const validated = e.target.value;
                setTakeProfitPercentage(validated);
                calculateTpSl(
                  currentPrice,
                  positionType,
                  "takeProfitPercentage",
                  validated
                );
              }}
              label="%"
              type="text"
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
            parseFloat(orderSize * 100000)
          )
        }
        variant={`${positionType === "BUY" ? "buy" : "sell"}`}
        color={positionType === "BUY" ? "primary" : "danger"}
        className="mt-4 w-full"
      >
        {positionType === "BUY" ? "BUY" : "SELL"}
      </Button>
    </div>
  );
}
