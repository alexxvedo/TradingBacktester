import localforage from "localforage";
import moment from "moment-timezone";

// Definir la lista de zonas horarias
export const timeZones = [
  { value: "Pacific/Honolulu", label: "UTC-10" },
  { value: "America/Anchorage", label: "UTC-9" },
  { value: "America/Los_Angeles", label: "UTC-8" },
  { value: "America/Denver", label: "UTC-7" },
  { value: "America/Chicago", label: "UTC-6" },
  { value: "America/New_York", label: "UTC-5" },
  { value: "America/Caracas", label: "UTC-4" },
  { value: "America/Sao_Paulo", label: "UTC-3" },
  { value: "Atlantic/South_Georgia", label: "UTC-2" },
  { value: "Atlantic/Azores", label: "UTC-1" },
  { value: "Europe/London", label: "UTC+0" },
  { value: "Europe/Paris", label: "UTC+1" },
  { value: "Europe/Berlin", label: "UTC+2" },
  { value: "Europe/Moscow", label: "UTC+3" },
  { value: "Asia/Dubai", label: "UTC+4" },
  { value: "Asia/Karachi", label: "UTC+5" },
  { value: "Asia/Dhaka", label: "UTC+6" },
  { value: "Asia/Bangkok", label: "UTC+7" },
  { value: "Asia/Shanghai", label: "UTC+8" },
  { value: "Asia/Tokyo", label: "UTC+9" },
  { value: "Australia/Sydney", label: "UTC+10" },
  { value: "Pacific/Auckland", label: "UTC+12" },
];

// ############## SESIONES ##############

/**
 * Asynchronously fetches sessions data from the server.
 * If the response status is 401, logs the error message and signs out the user.
 * Otherwise, sets the fetched sessions data, and updates the loading state.
 * Logs an error message if an error occurs during the fetching process.
 */
export const fetchSessions = async (setIsLoading, setSessions) => {
  setIsLoading(true);

  try {
    const res = await fetch("/api/sessions");

    if (res.status === 401) {
      // If the user is not authorized, log the error message and sign out
      console.log((await res.json()).error);
    } else {
      // If the user is authorized, set the fetched sessions data
      setSessions(await res.json());
    }
  } catch (error) {
    // Log an error message if an error occurs during the fetching process
    console.error("Error fetching sessions:", error);
  } finally {
    // Update the loading state
    setIsLoading(false);
  }
};

/**
 * Fetches available dates from the server and sets the state with the parsed dates.
 *
 * @return {Promise<void>} - A promise that resolves when the dates are fetched and the state is set.
 * @throws {Error} - If there is an error fetching the dates, it throws an error with the message "Failed to load available dates".
 */
export const fetchAvailableDates = async (setAvailableDates) => {
  try {
    // Fetch available dates from the server
    const response = await fetch("/api/dates");
    const dates = await response.json();

    // Parse the dates and set the state with the parsed dates
    setAvailableDates(
      dates.map((date) => {
        // Parse the date and convert it to ISO string format without the time
        const parsedDate = new Date(date).toISOString().split("T")[0];
        return parsedDate;
      })
    );
  } catch (error) {
    // Log an error message if there is an error fetching the dates
    console.error("Failed to load available dates:", error);
  }
};

// ############## SESIONES ID ##############

export const configureLocalForage = () => {
  localforage.config({
    driver: [localforage.INDEXEDDB],
    name: "backtester",
    version: 1.0,
    storeName: "sessionData",
    description: "Almacén de datos del grafico de la sesión",
  });
};

/**
 * Fetches CSV data within a specified date range from the server and updates the state.
 *
 * @param {Object} options - The options for fetching the CSV data.
 * @param {Date} options.start - The start date of the range.
 * @param {Date} options.end - The end date of the range.
 * @param {number} [options.limit] - The maximum number of data points to fetch. Defaults to undefined.
 * @param {number} [options.fetchingOffset=0] - The offset for fetching data points. Defaults to 0.
 * @param {Function} options.setInitialData - Function to set the initial data.
 * @param {Function} options.setDataUpdated - Function to set the data updated status.
 * @return {Promise<void>} - A promise that resolves when the data is fetched and the state is updated.
 * @throws {Error} - If there is an error fetching the data, it throws an error with the message "Failed to load data by date range".
 */
export const fetchCSVDataByDateRange = async ({
  id,
  start,
  end,
  limit,
  fetchingOffset = 0,
  setInitialData,
  setDataUpdated,
}) => {
  // If the limit is provided, add an extra 5000 data points to fetch
  if (limit) limit = limit + 5000;

  try {
    // Construct the URL for fetching the data
    const url = `/api/data?start=${start.toISOString()}&end=${end.toISOString()}&limit=${
      limit ? limit : 5000
    }&offset=${fetchingOffset}`;

    // Fetch the data from the server
    const response = await fetch(url);
    const data = await response.json();

    // If the fetched data length is less than the limit, set isFinished to true
    if (data.length < 5000) setIsFinished(true);

    // Fetch the stored data from localforage
    const storedData = (await localforage.getItem(`sessionData_${id}`)) || [];

    // Combine the stored data with the fetched data based on the fetching offset
    const newData = fetchingOffset === 0 ? data : [...storedData, ...data];

    // Store the new data in localforage
    await localforage.setItem(`sessionData_${id}`, newData);

    // Set the initial data and update the data updated status
    setInitialData(newData);
    setDataUpdated(false);
  } catch (error) {
    // Log an error message if there is an error fetching the data
    console.error("Failed to load data by date range:", error);
  }
};

/**
 * Updates the chart timezone based on the given time zone.
 *
 * @param {Object} chartRef - Reference to the chart.
 * @param {string} timeZone - The time zone to be applied.
 * @return {void} This function does not return anything.
 */
export const updateChartTimezone = (chartRef, timeZone) => {
  if (chartRef.current) {
    chartRef.current.applyOptions({
      localization: {
        timeFormatter: (timestamp) => {
          return moment
            .utc(timestamp * 1000)
            .tz(timeZone)
            .format("YYYY-MM-DD HH:mm:ss");
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        tickMarkFormatter: (timestamp) => {
          return moment
            .utc(timestamp * 1000)
            .tz(timeZone)
            .format("HH:mm");
        },
      },
    });
  }
};

/**
 * Updates the chart based on the initial data.
 *
 * @param {Function} setOpenFinishModal - Function to set the finish modal.
 * @param {Function} setUpdateCount - Function to update the global update count.
 * @param {Function} setIsFullyFinished - Function to set the isFullyFinished flag.
 * @param {Function} setIsPaused - Function to set the isPaused flag.
 * @param {Array} initialData - The array of data points to generate candles from.
 * @param {number} updateCount - The current update count.
 * @param {Object} seriesRef - Reference to the series.
 * @param {Function} setCurrentCandle - Function to update the global current candle.
 * @param {Function} setCurrentPrice - Function to update the global current price.
 * @param {Function} setCandleIndex - Function to update the global candle index.
 * @param {Function} setAllCandles - Function to update the global array of candles.
 * @param {Function} setOffset - Function to update the global offset.
 * @param {Function} setDataUpdated - Function to update the global data updated flag.
 * @param {boolean} isFinished - Flag indicating if the chart is finished.
 * @param {boolean} openFinishModal - Flag indicating if the finish modal is open.
 * @return {void} This function does not return anything.
 */
export const updateChart = (
  setOpenFinishModal,
  setUpdateCount,
  setIsFullyFinished,
  setIsPaused,
  initialData,
  updateCount,
  seriesRef,
  setCurrentCandle,
  setCurrentPrice,
  setCandleIndex,
  setAllCandles,
  setOffset,
  setDataUpdated,
  isFinished,
  openFinishModal,
  isPaused
) => {
  // Check if initialData is empty or undefined, or if the updateCount is greater than the length of initialData
  if (
    !initialData ||
    initialData.length === 0 ||
    updateCount > initialData.length
  ) {
    return;
  }

  // Number of updates per candle
  const updatesPerCandle = 60;

  // Check if the chart is paused
  if (isPaused) {
    return;
  }

  // Check if the updateCount is equal to the length of initialData and the chart is not fully finished
  if (updateCount === initialData.length && !isFullyFinished) {
    setOpenFinishModal(true); // Set the finish modal to true
    setUpdateCount(updateCount + 1); // Increment the update count
    setIsFullyFinished(true); // Set the isFullyFinished flag to true
    setIsPaused(true); // Set the isPaused flag to true
    return;
  }

  const baseIndex = updateCount;
  const dataPoint = initialData[baseIndex];

  const currentMinute = new Date(dataPoint.timestamp).getMinutes();

  const previousMinute =
    baseIndex !== 0
      ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
      : -1;

  // Check if the current minute is different from the previous minute
  if (currentMinute !== previousMinute) {
    // Ensure that the new candle starts exactly where the previous one ended
    const openPrice =
      baseIndex !== 0 ? initialData[baseIndex - 1].close : dataPoint.open; // The open price is the close price of the previous candle
    const newCandle = {
      time: new Date(dataPoint.timestamp).getTime() / 1000,

      open: openPrice,
      high: openPrice,
      low: openPrice,
      close: openPrice,
    };
    seriesRef.current.update(newCandle); // Update the series with the new candle
    setCurrentCandle(newCandle); // Set the current candle
    setCurrentPrice(newCandle.close); // Set the current price
    setUpdateCount(updateCount + 1); // Increment the update count
    setCandleIndex(candleIndex + 1); // Increment the candle index
    setAllCandles((prevCandles) => [...prevCandles, newCandle]); // Update the array of candles with the new candle
  } else {
    const updatedCandle = {
      ...currentCandle,
      close: dataPoint.close,
      high: Math.max(currentCandle.high, dataPoint.close),
      low: Math.min(currentCandle.low, dataPoint.close),
    };
    seriesRef.current.update(updatedCandle); // Update the series with the updated candle
    setCurrentCandle(updatedCandle); // Set the current candle
    setCurrentPrice(updatedCandle.close); // Set the current price
    setUpdateCount(updateCount + 1); // Increment the update count
    setAllCandles((prevCandles) =>
      prevCandles.map((candle, index) =>
        index === prevCandles.length - 1 ? updatedCandle : candle
      )
    ); // Update the array of candles with the updated candle
  }

  // Check if the updateCount plus 2000 is equal to the length of initialData and the chart is not finished and the finish modal is not open
  if (
    updateCount + 2000 === initialData.length &&
    !isFinished &&
    !openFinishModal
  ) {
    if (!dataUpdated) {
      setDataUpdated(true); // Set the data updated flag to true
      fetchCSVDataByDateRange({
        start: startDate,
        end: endDate,
        fetchingOffset: offset,
        setInitialData,
        setDataUpdated,
      }); // Fetch the CSV data by date range
      setOffset(offset + 5000); // Increment the offset
    }
  }
};

/**
 * Generates the final candles based on the given index.
 *
 * @param {number} index - The index to generate the candles up to.
 * @param {Array} initialData - The array of data points to generate candles from.
 * @param {Function} setUpdateCount - Function to update the global update count.
 * @param {Function} setCurrentCandle - Function to update the global current candle.
 * @param {Function} setCandleIndex - Function to update the global candle index.
 * @param {Function} setOpenFinishModal - Function to set the finish modal.
 * @param {Function} setIsFullyFinished - Function to set the isFullyFinished flag.
 * @param {Function} setIsPaused - Function to set the isPaused flag.
 * @param {Function} setAllCandles - Function to update the global array of candles.
 *
 * @return {Array} An array of candles.
 */
export const getFinalCandles = (
  index,
  initialData,
  setUpdateCount,
  setCurrentCandle,
  setCandleIndex,
  setOpenFinishModal,
  setIsFullyFinished,
  setIsPaused,
  setAllCandles
) => {
  // If initialData is empty or undefined, return early
  if (!initialData || initialData.length === 0) {
    return;
  }

  var candles = []; // Array to store the generated candles
  var candle = {}; // Object to store the current candle
  var localUpdateCount = 0; // Keep track of the current candle index

  // Generate candles up to the given index
  while (localUpdateCount < (index != 0 ? index - 1 : index)) {
    const baseIndex = localUpdateCount; // Get the base index for the current candle
    const dataPoint = initialData[baseIndex]; // Get the data point for the current candle

    const currentMinute = new Date(dataPoint.timestamp).getMinutes(); // Get the current minute of the data point
    const previousMinute =
      baseIndex != 0
        ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
        : -1; // Get the previous minute of the data point

    // If the current minute is different from the previous minute
    if (currentMinute !== previousMinute) {
      const openPrice =
        baseIndex != 0 ? initialData[baseIndex - 1].close : dataPoint.open; // Get the open price of the candle

      // If there is a previous minute (not the first candle)
      if (previousMinute != -1) {
        // Update the close price of the current candle
        candle = {
          ...candle,
          close: initialData[baseIndex - 1].close,
        };
        // Add the current candle to the candles array
        candles.push(structuredClone(candle));
        // Reset the current candle with the new values
        candle = {
          time: new Date(dataPoint.timestamp).getTime() / 1000,
          open: openPrice,
          high: openPrice,
          low: openPrice,
          close: openPrice,
        };
        localUpdateCount++; // Increment the localUpdateCount
      } else {
        // If it's the first candle, set the initial values for the candle
        candle = {
          time: new Date(dataPoint.timestamp).getTime() / 1000,
          open: openPrice,
          high: openPrice,
          low: openPrice,
          close: openPrice,
        };
        localUpdateCount++; // Increment the localUpdateCount
      }
    } else {
      // If the current minute is the same as the previous minute
      if (dataPoint.close > candle.high) {
        // Update the high price of the current candle
        candle = {
          ...candle,
          high: dataPoint.close,
        };
      } else if (dataPoint.close < candle.low) {
        // Update the low price of the current candle
        candle = {
          ...candle,
          low: dataPoint.close,
        };
      }
      localUpdateCount++; // Increment the localUpdateCount
    }
  }

  // Update the global update count and current candle
  setUpdateCount(localUpdateCount);
  setCurrentCandle(candle);
  setCandleIndex(index);

  // If all candles have been generated, set the finish modal and update the flags
  if (localUpdateCount == initialData.length) {
    setOpenFinishModal(true);
    setUpdateCount(updateCount + 1);
    setIsFullyFinished(true);
    setIsPaused(true);
  }

  setAllCandles(candles);
  // Return the generated candles
  return candles;
};
