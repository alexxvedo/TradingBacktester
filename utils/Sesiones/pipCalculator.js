const pipCalculator = (
  currentPrice,
  positionSize,
  elementChanged,
  elementChangedValue,
  positionType,
  pair,
  existingValues,
) => {
  const calculatePipValue = (pair, price) => {
    if (pair.endsWith("JPY")) {
      return (0.01 / price) * 100000;
    } else {
      return (0.0001 / price) * 100000;
    }
  };

  const pipValue = calculatePipValue(pair, currentPrice);
  const lotSize = 100000; // Estándar para calcular el valor del pip
  const convertedPositionSize = positionSize / lotSize; // Convertir a tamaño de lote estándar
  let result = {};

  console.log(
    "currentPrice",
    currentPrice,
    ", positionSize",
    convertedPositionSize,
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

  const calculateAmount = (pipDifference) =>
    Math.abs(pipDifference * convertedPositionSize * pipValue);
  const calculatePercentage = (amount) =>
    Math.abs((amount / (currentPrice * convertedPositionSize * lotSize)) * 100);

  switch (elementChanged) {
    case "stopLossValue":
      const stopLossPriceChange = (elementChangedValue * pipValue) / 100000;
      result.stopLossValue = elementChangedValue;
      result.stopLossPrice =
        positionType === "BUY"
          ? currentPrice - stopLossPriceChange
          : currentPrice + stopLossPriceChange;
      result.stopLossAmount = calculateAmount(elementChangedValue);
      result.stopLossPercentage = calculatePercentage(result.stopLossAmount);
      break;

    case "stopLossPrice":
      const priceDifferenceSL =
        positionType === "BUY"
          ? currentPrice - elementChangedValue
          : elementChangedValue - currentPrice;
      result.stopLossValue = Math.abs((priceDifferenceSL / pipValue) * 100000);
      result.stopLossPrice = elementChangedValue;
      result.stopLossAmount = calculateAmount(result.stopLossValue);
      result.stopLossPercentage = calculatePercentage(result.stopLossAmount);
      break;

    case "stopLossAmount":
      result.stopLossAmount = Math.abs(elementChangedValue);
      result.stopLossValue = Math.abs(
        elementChangedValue / (convertedPositionSize * pipValue),
      );
      const stopLossPriceChangeAmount =
        (result.stopLossValue * pipValue) / 100000;
      result.stopLossPrice =
        positionType === "BUY"
          ? currentPrice - stopLossPriceChangeAmount
          : currentPrice + stopLossPriceChangeAmount;
      result.stopLossPercentage = calculatePercentage(elementChangedValue);
      break;

    case "stopLossPercentage":
      const stopLossAmountFromPercentage =
        (elementChangedValue / 100) *
        (currentPrice * convertedPositionSize * lotSize);
      result.stopLossAmount = Math.abs(stopLossAmountFromPercentage);
      result.stopLossValue = Math.abs(
        stopLossAmountFromPercentage /
          (convertedPositionSize * lotSize * pipValue),
      );
      const stopLossPriceChangePercentage =
        (result.stopLossValue * pipValue) / 100000;
      result.stopLossPrice =
        positionType === "BUY"
          ? currentPrice - stopLossPriceChangePercentage
          : currentPrice + stopLossPriceChangePercentage;
      result.stopLossPercentage = elementChangedValue;
      break;

    case "takeProfitValue":
      const takeProfitPriceChange = (elementChangedValue * pipValue) / 100000;
      result.takeProfitValue = elementChangedValue;
      result.takeProfitPrice =
        positionType === "BUY"
          ? currentPrice + takeProfitPriceChange
          : currentPrice - takeProfitPriceChange;
      result.takeProfitAmount = calculateAmount(elementChangedValue);
      result.takeProfitPercentage = calculatePercentage(
        result.takeProfitAmount,
      );
      break;

    case "takeProfitPrice":
      result.takeProfitPrice = elementChangedValue;
      const priceDifferenceTP =
        positionType === "BUY"
          ? elementChangedValue - currentPrice
          : currentPrice - elementChangedValue;
      result.takeProfitValue = Math.abs(
        (priceDifferenceTP / pipValue) * 100000,
      );
      result.takeProfitAmount = calculateAmount(result.takeProfitValue);
      result.takeProfitPercentage = calculatePercentage(
        result.takeProfitAmount,
      );
      break;

    case "takeProfitAmount":
      result.takeProfitAmount = Math.abs(elementChangedValue);
      result.takeProfitValue = Math.abs(
        elementChangedValue / (convertedPositionSize * pipValue),
      );
      const takeProfitPriceChangeAmount =
        (result.takeProfitValue * pipValue) / 100000;
      result.takeProfitPrice =
        positionType === "BUY"
          ? currentPrice + takeProfitPriceChangeAmount
          : currentPrice - takeProfitPriceChangeAmount;
      result.takeProfitPercentage = calculatePercentage(elementChangedValue);
      break;

    case "takeProfitPercentage":
      const takeProfitAmountFromPercentage =
        (elementChangedValue / 100) *
        (currentPrice * convertedPositionSize * lotSize);
      result.takeProfitAmount = Math.abs(takeProfitAmountFromPercentage);
      result.takeProfitValue = Math.abs(
        takeProfitAmountFromPercentage /
          (convertedPositionSize * lotSize * pipValue),
      );
      const takeProfitPriceChangePercentage =
        (result.takeProfitValue * pipValue) / 100000;
      result.takeProfitPrice =
        positionType === "BUY"
          ? currentPrice + takeProfitPriceChangePercentage
          : currentPrice - takeProfitPriceChangePercentage;
      result.takeProfitPercentage = elementChangedValue;
      break;

    case "orderSize":
      if (existingValues.stopLossValue !== undefined) {
        result.stopLossAmount = calculateAmount(existingValues.stopLossValue);
        result.stopLossPercentage = calculatePercentage(result.stopLossAmount);
      }
      if (existingValues.takeProfitValue !== undefined) {
        result.takeProfitAmount = calculateAmount(
          existingValues.takeProfitValue,
        );
        result.takeProfitPercentage = calculatePercentage(
          result.takeProfitAmount,
        );
      }
      break;

    default:
      throw new Error("Invalid elementChanged type");
  }

  return result;
};

export default pipCalculator;
