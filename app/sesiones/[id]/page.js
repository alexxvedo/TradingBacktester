"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation"; // Importar useParams
import PositionCreator from "@/components/PositionCreator";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import "@/app/globals.css";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";

import PositionPanel from "@/components/Sesiones/PositionPanel";
import { Spinner } from "@nextui-org/spinner";
import { useTheme } from "next-themes";
import localforage from "localforage";
import moment from "moment-timezone";
import ChartComponent from "@/components/Sesiones/ChartComponent";
import ChartPlayer from "@/components/Sesiones/ChartPlayer";

export default function SessionPage() {
  const { id } = useParams(); // Usar useParams para obtener el id
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCandle, setCurrentCandle] = useState({});
  const [candleIndex, setCandleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [candlePerSecond, setCandlePerSecond] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [initialData, setInitialData] = useState([]);
  const [allCandles, setAllCandles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [dataUpdated, setDataUpdated] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [recoverSession, setRecoverSession] = useState(false);
  const [recoverCandleIndex, setRecoverCandleIndex] = useState(0);
  const [accountSize, setAccountSize] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");
  const [pair, setPair] = useState("");
  const [timeframe, setTimeframe] = useState("");

  const [panelOpen, setPanelOpen] = useState(true);
  const [positionCreatorOpen, setPositionCreatorOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isFullyFinished, setIsFullyFinished] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga de datos
  const [markers, setMarkers] = useState([]);
  const [lineSeries, setLineSeries] = useState(null);
  const [priceLines, setPriceLines] = useState([]);

  const { theme, setTheme } = useTheme();
  const [timeZone, setTimeZone] = useState("Europe/London"); // GMT+0 por defecto

  const splitRef = useRef(null);

  // Definir la lista de zonas horarias
  const timeZones = [
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

  const configureLocalForage = () => {
    localforage.config({
      driver: [localforage.INDEXEDDB],
      name: "backtester",
      version: 1.0,
      storeName: "sessionData",
      description: "Almacén de datos del grafico de la sesión",
    });
  };

  const clearLocalForage = async () => {
    try {
      await localforage.clear();
    } catch (error) {
      console.error("Error clearing LocalForage data:", error);
    }
  };

  /**
   * Fetches CSV data within a specified date range from the server and updates the state.
   *
   * @param {Object} options - The options for fetching the CSV data.
   * @param {Date} options.start - The start date of the range.
   * @param {Date} options.end - The end date of the range.
   * @param {number} [options.limit] - The maximum number of data points to fetch. Defaults to undefined.
   * @param {number} [options.fetchingOffset=0] - The offset for fetching data points. Defaults to 0.
   * @param {string} options.pair - The currency pair to fetch data for.
   * @param {string} options.timeframe - The timeframe for the data.
   * @return {Promise<void>} - A promise that resolves when the data is fetched and the state is updated.
   * @throws {Error} - If there is an error fetching the data, it throws an error with the message "Failed to load data by date range".
   */
  const fetchCSVDataByDateRange = async ({
    start,
    end,
    limit,
    fetchingOffset = 0,
    pair,
    timeframe,
  }) => {
    const maxAttempts = 3; // Número máximo de intentos
    let attempt = 0;

    while (attempt < maxAttempts) {
      try {
        if (limit) limit += 5000;
        else limit = 5000;
        const response = await fetch(
          `/api/data?start=${start}&end=${end}&limit=${limit}&offset=${fetchingOffset}&pair=${pair}&interval=${timeframe}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.length < limit) setIsFinished(true);
        const storedData =
          (await localforage.getItem(`sessionData_${id}`)) || [];
        const newData = fetchingOffset === 0 ? data : [...storedData, ...data];
        await localforage.setItem(`sessionData_${id}`, newData);
        setInitialData(newData);
        setDataUpdated(false);
        return; // Salir de la función si la solicitud fue exitosa
      } catch (error) {
        console.error(
          `Failed to load data by date range (attempt ${attempt + 1}):`,
          error,
        );
        attempt++;

        if (attempt >= maxAttempts) {
          throw new Error(
            "Failed to load data by date range after multiple attempts",
          );
        }

        await new Promise((res) => setTimeout(res, 2000)); // Esperar 2 segundos antes de reintentar
      }
    }
  };

  /**
   * Saves session data to the server by sending a PUT request to `/api/sessions/${id}`
   * with the start date, end date, and current candle index.
   *
   * @return {Promise<void>} - A promise that resolves when the session data is saved.
   */
  const saveSessionData = async () => {
    const res = await fetch(`/api/sessions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        currentCandleIndex: updateCount,
      }),
    });

    if (!res.ok) {
      console.error("Failed to save session data");
    }
  };

  /**
   * Generates the final candles based on the given index.
   *
   * @param {number} index - The index to generate the candles up to.
   * @return {Array} An array of candles.
   */
  const getFinalCandles = (index, weekend = false) => {
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
      var currentMinute;
      var previousMinute;

      const currentDate = new Date(dataPoint.timestamp);
      const dayOfWeek = currentDate.getUTCDay(); // Get the day of the week (0: Sunday, 6: Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        localUpdateCount++;
        continue; // Skip weekends
      }
      if (timeframe === "1h" || timeframe === "4h") {
        currentMinute = new Date(dataPoint.timestamp).getHours();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getHours()
            : -1; // Get the previous minute of the data point
      } else if (timeframe === "1d") {
        currentMinute = new Date(dataPoint.timestamp).getDay();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getDay()
            : -1; // Get the previous minute of the data point
      } else {
        currentMinute = new Date(dataPoint.timestamp).getMinutes(); // Get the current minute of the data point
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
            : -1; // Get the previous minute of the data point
      }

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
            high: dataPoint.high,
            low: dataPoint.low,
            close: dataPoint.close,
          };
          localUpdateCount++; // Increment the localUpdateCount
        } else {
          // If it's the first candle, set the initial values for the candle
          candle = {
            time: new Date(dataPoint.timestamp).getTime() / 1000,
            open: openPrice,
            high: dataPoint.high,
            low: dataPoint.low,
            close: dataPoint.close,
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
    setAllCandles(candles);

    // If all candles have been generated, set the finish modal and update the flags
    if (localUpdateCount == initialData.length - 1) {
      setOpenFinishModal(true);
      setUpdateCount(initialData.length - 1);
      setIsFullyFinished(true);
      setIsPaused(true);
    }

    // Return the generated candles
    return candles;
  };

  const passWeekends = () => {
    console.log("Estoy aqui");
    setIsPaused(true);
    var dayOfWeek = -1; // Variable to store the day of the week

    var localUpdateCount = updateCount;
    while (dayOfWeek === -1 || dayOfWeek === 0 || dayOfWeek === 6) {
      console.log("Estoy aqui");

      const baseIndex = localUpdateCount; // Get the base index for the current candle
      const dataPoint = initialData[baseIndex]; // Get the data point for the current candle

      const currentDate = new Date(dataPoint.timestamp);
      dayOfWeek = currentDate.getUTCDay(); // Get the day of the week (0: Sunday, 6: Saturday)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        localUpdateCount++;
      }
    }
    // Update the global update count and current candle
    setUpdateCount(localUpdateCount);
    setCandleIndex(localUpdateCount);
    setIsPaused(false);
  };

  /**
   * Updates the chart based on the initial data.
   *
   * @return {void} This function does not return anything.
   */
  const updateChart = () => {
    if (
      !initialData ||
      initialData.length === 0 ||
      updateCount >= initialData.length - 1 ||
      isFullyFinished
    ) {
      return;
    }

    // Number of updates per candle
    const updatesPerCandle = 60;

    if (isPaused) {
      return;
    }

    if (updateCount === initialData.length - 1 && !isFullyFinished) {
      setOpenFinishModal(true);
      setUpdateCount(updateCount + 1);
      setIsFullyFinished(true);
      setIsPaused(true);
      return;
    }

    const baseIndex = updateCount;
    const dataPoint = initialData[baseIndex];

    var currentMinute, previousMinute;
    const currentDate = new Date(dataPoint.timestamp);
    const dayOfWeek = currentDate.getUTCDay(); // Get the day of the week (0: Sunday, 6: Saturday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setIsPaused(true);
      passWeekends();
    } else {
      if (timeframe === "1h" || timeframe === "4h") {
        currentMinute = new Date(dataPoint.timestamp).getHours();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getHours()
            : -1; // Get the previous minute of the data point
      } else if (timeframe === "1d") {
        currentMinute = new Date(dataPoint.timestamp).getDay();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getDay()
            : -1; // Get the previous minute of the data point
      } else {
        currentMinute = new Date(dataPoint.timestamp).getMinutes(); // Get the current minute of the data point
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
            : -1; // Get the previous minute of the data point
      }

      if (currentMinute !== previousMinute) {
        // Ensure that the new candle starts exactly where the previous one ended
        const openPrice =
          baseIndex !== 0 ? initialData[baseIndex - 1].close : dataPoint.open; // The open price is the close price of the previous candle
        const newCandle = {
          time: new Date(dataPoint.timestamp).getTime() / 1000,

          open: openPrice,
          high: dataPoint.high,
          low: dataPoint.low,
          close: dataPoint.close,
        };
        seriesRef.current.update(newCandle);
        setCurrentCandle(newCandle);
        setCurrentPrice(newCandle.close);
        setUpdateCount(updateCount + 1);
        setCandleIndex(candleIndex + 1);
        setAllCandles((prevCandles) => [...prevCandles, newCandle]);
      } else {
        const updatedCandle = {
          ...currentCandle,
          close: dataPoint.close,
          high: Math.max(currentCandle.high, dataPoint.close),
          low: Math.min(currentCandle.low, dataPoint.close),
        };
        seriesRef.current.update(updatedCandle);
        setCurrentCandle(updatedCandle);
        setCurrentPrice(updatedCandle.close);
        setUpdateCount(updateCount + 1);
        setAllCandles((prevCandles) =>
          prevCandles.map((candle, index) =>
            index === prevCandles.length - 1 ? updatedCandle : candle,
          ),
        );
      }
    }

    if (
      updateCount + 2000 === initialData.length &&
      !isFinished &&
      !openFinishModal
    ) {
      if (!dataUpdated) {
        setDataUpdated(true);
        fetchCSVDataByDateRange({
          start: startDate,
          end: endDate,
          fetchingOffset: offset,

          pair,
          timeframe,
        });
        setOffset(offset + 5000);
      }
    }
  };

  const updateChartTimezone = () => {
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

  useEffect(() => {
    configureLocalForage();
  }, []);

  useEffect(() => {
    setRecoverSession(true);

    /**
     * Fetches session data from the server and updates the component state
     * with the fetched data.
     *
     * @return {Promise<void>} - A promise that resolves when the session data
     * has been fetched and the component state has been updated.
     */
    const fetchSessionData = async () => {
      setIsLoading(true);

      const res = await fetch(`/api/sessions/${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setAccountSize(data.accountSize);
        setCurrentBalance(data.currentBalance);
        setPair(data.currency);
        setTimeframe(data.interval);
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setRecoverCandleIndex(data.currentCandleIndex);

        // Función para formatear el tamaño en unidades legibles
        const storedData = await localforage.getItem(`sessionData_${id}`);

        if (storedData && storedData.length > 0) {
          setInitialData(storedData);

          if (data.currentCandleIndex + 2000 >= storedData.length) {
            fetchCSVDataByDateRange({
              start: new Date(data.startDate),
              end: new Date(data.endDate),
              limit: data.currentCandleIndex - storedData.length,
              fetchingOffset: storedData.length,
              pair: data.currency,
              timeframe: data.interval,
            });
          }

          setIsLoading(false);
          setOffset(data.currentCandleIndex + 5000);
        } else if (data.startDate && data.endDate) {
          fetchCSVDataByDateRange({
            start: new Date(data.startDate),
            end: new Date(data.endDate),
            limit: data.currentCandleIndex,
            pair: data.currency,
            timeframe: data.interval,
          });

          setOffset(data.currentCandleIndex + 5000);
        }
      } else {
        console.error("Failed to fetch session data");
      }

      setIsLoading(false);
    };
    if (id) {
      fetchSessionData();
    }
  }, [id]);

  useEffect(() => {
    if (!recoverSession && !isFullyFinished) {
      const intervalID = setInterval(() => {
        updateChart(); // Update the chart
      }, 1000 / candlePerSecond);
      return () => clearInterval(intervalID); // Clear the interval on cleanup
    } else if (initialData.length != 0 && !isFullyFinished) {
      const candles = getFinalCandles(recoverCandleIndex);

      for (var i = 0; i < candles.length; i++) {
        try {
          seriesRef.current.update(candles[i]); // Update each candle in the series
        } catch (error) {
          console.error(error);
        }
      }
      setRecoverSession(false); // Reset recover session flag
    } else if (isFullyFinished && !isPaused) {
      setOpenFinishModal(true); // Open finish modal if fully finished and not paused
    }
  }, [
    initialData,
    isPaused,
    candleIndex,
    subIndex,
    currentCandle,
    candlePerSecond,
    recoverCandleIndex,
    recoverSession,
  ]);

  useEffect(() => {
    updateChartTimezone();
  }, [timeZone]);

  const handleResize = (sizes, type) => {
    if (type === "vertical") {
      if (sizes[1] < 11) {
        setPanelOpen(false);
      } else if (sizes[1] > 11) setPanelOpen(true);
    } else if (type === "horizontal") {
      if (sizes[1] < 11) setPositionCreatorOpen(false);
      else if (sizes[1] > 11) setPositionCreatorOpen(true);
    }
  };

  const togglePause = () => setIsPaused(!isPaused);

  const addPriceLines = (order) => {
    const price = parseFloat(order.entryPrice);
    const color = "rgba(0, 0, 255, 0.5)";
    const tpColor = "rgba(22, 150, 138, 0.5)";
    const slColor = "rgba(223, 67, 64, 0.5)";
    const entryPriceLine = {
      positionId: order.id,

      price: price,
      color: color,
      ineWidth: 2,
      lineStyle: 2, // LineStyle.Dashed
      axisLabelVisible: true,
      title:
        order.type === "buy"
          ? "Buy " +
            order.size / 10000 +
            " " +
            order.orderType.toUpperCase() +
            " @ " +
            order.entryPrice
          : "Sell " +
            order.size / 100000 +
            " " +
            order.orderType.toUpperCase() +
            " @ " +
            order.entryPrice,
      lineType: "priceLine",
      draggable: false,
    };

    const tpLine = {
      positionId: order.id,

      price: parseFloat(order.tp),
      color: tpColor,
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "TP @ " + order.tp,
      lineType: "tp",
      draggable: true,
    };
    const slLine = {
      positionId: order.id,

      price: parseFloat(order.sl),
      color: slColor,
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "SL @ " + order.sl,
      lineType: "sl",
      draggable: true,
    };

    const finalPriceLine = lineSeries.createPriceLine(entryPriceLine);
    const finalTpLine = lineSeries.createPriceLine(tpLine);
    const finalSlLine = lineSeries.createPriceLine(slLine);

    setPriceLines([...priceLines, finalPriceLine, finalTpLine, finalSlLine]);
  };
  return (
    <div className="flex flex-col min-h-[100%] min-w-full p-4 border-2 rounded-lg">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={80} minSize={60}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={68} minSize={68}>
              <div className="flex flex-col w-full h-full pb-4 pr-4">
                <ChartComponent
                  isLoading={isLoading}
                  chartContainerRef={chartContainerRef}
                  chartRef={chartRef}
                  seriesRef={seriesRef}
                  lineSeries={lineSeries}
                  setLineSeries={setLineSeries}
                  markers={markers}
                  timeZone={timeZone}
                  theme={theme}
                  priceLines={priceLines}
                  setPriceLines={setPriceLines}
                  orders={orders}
                  setOrders={setOrders}
                />
                <ChartPlayer
                  isPaused={isPaused}
                  togglePause={togglePause}
                  candlePerSecond={candlePerSecond}
                  setCandlePerSecond={setCandlePerSecond}
                  saveSessionData={saveSessionData}
                  timeZones={timeZones}
                  timeZone={timeZone}
                  setTimeZone={setTimeZone}
                  theme={theme}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30} minSize={11} collapsible={true}>
              <div className="flex border-2 rounded-lg w-full h-full">
                <PositionCreator
                  currentPrice={currentPrice}
                  currentBalance={currentBalance}
                  saveSessionData={saveSessionData}
                  sessionId={id}
                  orders={orders}
                  setOrders={setOrders}
                  markers={markers}
                  setMarkers={setMarkers}
                  currentCandleDate={currentCandle.time}
                  addPriceLines={addPriceLines}
                  pair={pair}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={8}>
          <div className="w-full h-full border-2 rounded-lg p-4">
            <PositionPanel
              panelOpen={panelOpen}
              setPanelOpen={setPanelOpen}
              sessionId={id}
              currentPrice={currentPrice}
              orders={orders}
              setOrders={setOrders}
              saveSessionData={saveSessionData}
              accountSize={accountSize}
              lineSeries={lineSeries}
              priceLines={priceLines}
              setPriceLines={setPriceLines}
              addPriceLines={addPriceLines}
              currentCandleDate={currentCandle.time}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Modal
        isOpen={isLoading}
        onOpenChange={setIsLoading}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="flex items-center">
          <ModalHeader className="flex flex-col gap-1">
            Loading Data
          </ModalHeader>
          <ModalBody>
            <Spinner color="secondary" />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={openFinishModal}
        onOpenChange={() => {
          setOpenFinishModal(false);
          setIsFullyFinished(true);
        }}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="flex items-center">
          <ModalHeader className="flex flex-col gap-1">
            You finished the Session
          </ModalHeader>
          <ModalBody>
            <h3>Congratulations!</h3>
            <p>
              You have finished the session, one less to becoming a great trader
            </p>
            <Button
              variant="light"
              color="danger"
              onClick={() => {
                setOpenFinishModal(false);
                setIsFullyFinished(true);
              }}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
