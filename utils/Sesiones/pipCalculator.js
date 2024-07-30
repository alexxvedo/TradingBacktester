const pipValues = {
  EURUSD: 0.0001,
  USDJPY: 0.01,
  GBPUSD: 0.0001,
  AUDUSD: 0.0001,
  USDCHF: 0.0001,
  EURJPY: 0.01,
  EURGBP: 0.0001,
  EURCHF: 0.0001,
  NZDUSD: 0.0001,
  // Agrega más pares de divisas según sea necesario
};

const pipCalculator = (
  currentPrice,
  positionSize,
  elementChanged,
  elementChangedValue,
  positionType,
  pair,
  existingValues,
) => {
  const pipValue = pipValues[pair];
  let result = {};

  console.log(
    "currentPrice",
    currentPrice,
    ", positionSize",
    positionSize,
    ", elementChanged",
    elementChanged,
    ", elementChangedValue",
    elementChangedValue,
    ", positionType",
    positionType,
    ", pair",
    pair,
    ", existingValues",
    existingValues,
  );

  switch (elementChanged) {
    case "stopLossValue":
      const stopLossPriceChange = elementChangedValue * pipValue * -1;
      result.stopLossValue = elementChangedValue;
      result.stopLossPrice =
        positionType === "buy"
          ? currentPrice - stopLossPriceChange
          : currentPrice + stopLossPriceChange;
      result.stopLossAmount = elementChangedValue * positionSize * pipValue;
      result.stopLossPercentage =
        (result.stopLossAmount / (currentPrice * positionSize)) * 100;
      break;

    case "stopLossPrice":
      const priceDifferenceSL =
        positionType === "buy"
          ? currentPrice - elementChangedValue
          : elementChangedValue - currentPrice;
      result.stopLossValue = priceDifferenceSL / pipValue;
      result.stopLossPrice = elementChangedValue;

      result.stopLossAmount = result.stopLossValue * positionSize * pipValue;
      result.stopLossPercentage =
        (result.stopLossAmount / (currentPrice * positionSize)) * 100;
      break;

    case "stopLossAmount":
      result.stopLossValue = elementChangedValue / (positionSize * pipValue);
      const priceChangeSL = result.stopLossValue * pipValue;
      result.stopLossPrice =
        positionType === "buy"
          ? currentPrice - priceChangeSL
          : currentPrice + priceChangeSL;
      result.stopLossAmount = elementChangedValue;

      result.stopLossPercentage =
        (elementChangedValue / (currentPrice * positionSize)) * 100;
      break;

    case "stopLossPercentage":
      const amountLoss =
        (elementChangedValue / 100) * (currentPrice * positionSize);
      result.stopLossAmount = amountLoss;
      result.stopLossValue = amountLoss / (positionSize * pipValue);
      const slPriceChange = result.stopLossValue * pipValue;
      result.stopLossPrice =
        positionType === "buy"
          ? currentPrice - slPriceChange
          : currentPrice + slPriceChange;
      result.stopLossPercentage = elementChangedValue;

      break;

    case "takeProfitValue":
      const takeProfitPriceChange = elementChangedValue * pipValue;
      result.takeProfitValue = elementChangedValue;

      result.takeProfitPrice =
        positionType === "buy"
          ? currentPrice + takeProfitPriceChange
          : currentPrice - takeProfitPriceChange;
      result.takeProfitAmount = elementChangedValue * positionSize * pipValue;
      result.takeProfitPercentage =
        (result.takeProfitAmount / (currentPrice * positionSize)) * 100;
      break;

    case "takeProfitPrice":
      result.takeProfitPrice = elementChangedValue;

      const priceDifferenceTP =
        positionType === "buy"
          ? elementChangedValue - currentPrice
          : currentPrice - elementChangedValue;
      result.takeProfitValue = priceDifferenceTP / pipValue;
      result.takeProfitAmount =
        result.takeProfitValue * positionSize * pipValue;
      result.takeProfitPercentage =
        (result.takeProfitAmount / (currentPrice * positionSize)) * 100;
      break;

    case "takeProfitAmount":
      result.takeProfitAmount = elementChangedValue;

      result.takeProfitValue = elementChangedValue / (positionSize * pipValue);
      const priceChangeTp = result.takeProfitValue * pipValue;
      result.takeProfitPrice =
        positionType === "buy"
          ? currentPrice + priceChangeTp
          : currentPrice - priceChangeTp;
      result.takeProfitPercentage =
        (elementChangedValue / (currentPrice * positionSize)) * 100;
      break;

    case "takeProfitPercentage":
      result.takeProfitPercentage = elementChangedValue;

      const amountProfit =
        (elementChangedValue / 100) * (currentPrice * positionSize);
      result.takeProfitAmount = amountProfit;
      result.takeProfitValue = amountProfit / (positionSize * pipValue);
      const tpPriceChange = result.takeProfitValue * pipValue;
      result.takeProfitPrice =
        positionType === "buy"
          ? currentPrice + tpPriceChange
          : currentPrice - tpPriceChange;
      break;

    case "orderSize":
      if (existingValues.stopLossValue !== undefined) {
        result.stopLossAmount =
          existingValues.stopLossValue * positionSize * pipValue;
        result.stopLossPercentage =
          (result.stopLossAmount / (currentPrice * positionSize)) * 100;
      }
      if (existingValues.takeProfitValue !== undefined) {
        result.takeProfitAmount =
          existingValues.takeProfitValue * positionSize * pipValue;
        result.takeProfitPercentage =
          (result.takeProfitAmount / (currentPrice * positionSize)) * 100;
      }
      break;

    default:
      throw new Error("Invalid elementChanged type");
  }

  return result;
};

export default pipCalculator;
