"use client";

import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "next/navigation"; // Importar useParams
import PositionCreator from "@/components/PositionCreator";
import { Button } from "@nextui-org/button";

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

  const [panelOpen, setPanelOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isFullyFinished, setIsFullyFinished] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga de datos
  const [markers, setMarkers] = useState([]);
  const [lineSeries, setLineSeries] = useState(null);

  const { theme, setTheme } = useTheme();
  const [timeZone, setTimeZone] = useState("UTC"); // GMT+0 por defecto

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

  /**
   * Fetches available dates from the server and sets the state with the parsed dates.
   *
   * @return {Promise<void>} - A promise that resolves when the dates are fetched and the state is set.
   * @throws {Error} - If there is an error fetching the dates, it throws an error with the message "Failed to load available dates".
   */
  const fetchAvailableDates = async () => {
    try {
      // Fetch available dates from the server
      const response = await fetch("/api/dates");
      const dates = await response.json();

      // Parse the dates and set the state with the parsed dates
      setAvailableDates(
        dates.map((date) => {
          // Parse the date and convert it to a Date object
          return new Date(date);
        })
      );
    } catch (error) {
      // Log an error message if there is an error fetching the dates
      console.error("Failed to load available dates:", error);
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
   * @return {Promise<void>} - A promise that resolves when the data is fetched and the state is updated.
   * @throws {Error} - If there is an error fetching the data, it throws an error with the message "Failed to load data by date range".
   */
  const fetchCSVDataByDateRange = async ({
    start,
    end,
    limit,
    fetchingOffset = 0,
  }) => {
    if (limit) limit = limit + 5000;
    try {
      const response = await fetch(
        `/api/data?start=${start.toISOString()}&end=${end.toISOString()}&limit=${
          limit ? limit : 5000
        }&offset=${fetchingOffset}`
      );
      const data = await response.json();

      if (data.length < 5000) setIsFinished(true);

      const storedData = (await localforage.getItem(`sessionData_${id}`)) || [];
      const newData = fetchingOffset === 0 ? data : [...storedData, ...data];
      await localforage.setItem(`sessionData_${id}`, newData);
      setInitialData(newData);
      setDataUpdated(false);
    } catch (error) {
      console.error("Failed to load data by date range:", error);
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

  const resetAndLoadSeries = () => {
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current); // Eliminar la serie actual
      setUpdateCount(0);
      seriesRef.current = chartRef.current.addCandlestickSeries({
        // Crear una nueva serie
        priceFormat: {
          type: "price",
          precision: 5,
          minMove: 0.00001,
        },
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
    }
  };

  /**
   * Generates the final candles based on the given index.
   *
   * @param {number} index - The index to generate the candles up to.
   * @return {Array} An array of candles.
   */
  const getFinalCandles = (index) => {
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

  /**
   * Updates the chart based on the initial data.
   *
   * @return {void} This function does not return anything.
   */
  const updateChart = () => {
    if (
      !initialData ||
      initialData.length === 0 ||
      updateCount > initialData.length
    ) {
      return;
    }

    // Number of updates per candle
    const updatesPerCandle = 60;

    if (isPaused) {
      return;
    }

    if (updateCount === initialData.length && !isFullyFinished) {
      setOpenFinishModal(true);
      setUpdateCount(updateCount + 1);
      setIsFullyFinished(true);
      setIsPaused(true);
      return;
    }

    const baseIndex = updateCount;
    const dataPoint = initialData[baseIndex];

    const currentMinute = new Date(dataPoint.timestamp).getMinutes();

    const previousMinute =
      baseIndex !== 0
        ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
        : -1;

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
          index === prevCandles.length - 1 ? updatedCandle : candle
        )
      );
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
      chartRef.current.timeScale().fitContent(); // Ajustar la escala de tiempo para que se adapte al contenido
    }
  };

  useEffect(() => {
    configureLocalForage();
    fetchAvailableDates();
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

        // Función para formatear el tamaño en unidades legibles
        const storedData = await localforage.getItem(`sessionData_${id}`);
        if (storedData && storedData.length > 0) {
          setRecoverCandleIndex(data.currentCandleIndex);

          setInitialData(storedData);
          setIsLoading(false);
          setOffset(data.currentCandleIndex + 5000);

          return;
        }

        if (data.startDate && data.endDate) {
          setStartDate(new Date(data.startDate));
          setEndDate(new Date(data.endDate));

          fetchCSVDataByDateRange({
            start: new Date(data.startDate),
            end: new Date(data.endDate),
            limit: data.currentCandleIndex,
          });

          setOffset(data.currentCandleIndex + 5000);
          setRecoverCandleIndex(data.currentCandleIndex);
        } else {
          setRecoverSession(false);
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
    } else if (!isFullyFinished) {
      if (initialData.length != 0) {
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
  const togglePause = () => setIsPaused(!isPaused);

  return (
    <div className="flex flex-col min-h-[100%] min-w-full p-4 gap-4 border-2 rounded-lg">
      <div
        className={`flex flex-row ${
          panelOpen ? "min-h-[70%] max-h-[70%]" : "min-h-[92%] max-h-[92%]"
        }  min-w-full p-4 border-2  rounded-lg items-center justify-between`}
      >
        <div className="flex flex-col h-full max-w-[80%] min-w-[80%] ">
          <ChartComponent
            chartContainerRef={chartContainerRef}
            chartRef={chartRef}
            seriesRef={seriesRef}
            lineSeries={lineSeries}
            setLineSeries={setLineSeries}
            markers={markers}
            timeZone={timeZone}
            theme={theme}
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
        <div className="flex gap-4 max-w-[20%] min-h-full p-6 border-2 rounded-lg ">
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
          />
        </div>
      </div>
      <div
        className={`${
          panelOpen ? "max-h-[28%] min-h-[28%]" : "max-h-[5%] h-[5%]"
        } w-full min-w-full border-2 rounded-lg`}
      >
        <PositionPanel
          panelOpen={panelOpen}
          setPanelOpen={setPanelOpen}
          sessionId={id}
          currentPrice={currentPrice}
          orders={orders}
          setOrders={setOrders}
          saveSessionData={saveSessionData}
          accountSize={accountSize}
        />
      </div>
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
          <ModalHeader className="flex flex-col gap-1 ">
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
          <ModalHeader className="flex flex-col gap-1 ">
            You finished the Session
          </ModalHeader>
          <ModalBody>
            <h3>Congratulations!</h3>
            <p>
              You have finished the session, one less to becoming a great trader
            </p>
            <Button
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
