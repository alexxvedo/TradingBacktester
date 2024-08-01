"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
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
  const { id } = useParams();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCandle, setCurrentCandle] = useState({});
  const [candleIndex, setCandleIndex] = useState(0);
  const [candlePerSecond, setCandlePerSecond] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [initialData, setInitialData] = useState([]);
  const [allCandles, setAllCandles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  const [isLoading, setIsLoading] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [lineSeries, setLineSeries] = useState(null);
  const [priceLines, setPriceLines] = useState([]);
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const [timeZone, setTimeZone] = useState("Europe/London");

  // Define `timer` using useRef
  const timerRef = useRef(null);

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

  const fetchCSVDataByDateRange = async ({
    start,
    end,
    limit,
    fetchingOffset = 0,
    pair,
    timeframe,
  }) => {
    const maxAttempts = 3;
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

        // Crear un mapa para almacenar los datos sin duplicados
        const dataMap = new Map();

        // Agregar datos almacenados previamente al mapa
        storedData.forEach((item) => {
          dataMap.set(item.timestamp, item);
        });

        // Agregar nuevos datos al mapa, eliminando duplicados
        data.forEach((item) => {
          dataMap.set(item.timestamp, item);
        });

        // Convertir el mapa a un array
        const newData = Array.from(dataMap.values());

        await localforage.setItem(`sessionData_${id}`, newData);
        setInitialData(newData);
        setDataUpdated(false);
        return;
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

        await new Promise((res) => setTimeout(res, 2000));
      }
    }
  };

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

  const getFinalCandles = (index, weekend = false) => {
    if (!initialData || initialData.length === 0) {
      return;
    }

    var candles = [];
    var candle = {};

    var localUpdateCount = 0;

    while (localUpdateCount < (index != 0 ? index - 1 : index)) {
      const baseIndex = localUpdateCount;
      const dataPoint = initialData[baseIndex];
      var currentMinute;
      var previousMinute;

      const currentDate = new Date(dataPoint.timestamp);

      if (timeframe === "1h" || timeframe === "4h") {
        currentMinute = new Date(dataPoint.timestamp).getHours();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getHours()
            : -1;
      } else if (timeframe === "1d") {
        currentMinute = new Date(dataPoint.timestamp).getDay();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getDay()
            : -1;
      } else {
        currentMinute = new Date(dataPoint.timestamp).getMinutes();
        previousMinute =
          baseIndex != 0
            ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
            : -1;
      }

      if (currentMinute !== previousMinute) {
        const openPrice =
          baseIndex != 0 ? initialData[baseIndex - 1].close : dataPoint.open;

        if (previousMinute != -1) {
          candle = {
            ...candle,
            close: initialData[baseIndex - 1].close,
          };
          candles.push(structuredClone(candle));
          candle = {
            time: new Date(dataPoint.timestamp).getTime() / 1000,
            open: openPrice,
            high: dataPoint.high,
            low: dataPoint.low,
            close: dataPoint.close,
          };
          localUpdateCount++;
        } else {
          candle = {
            time: new Date(dataPoint.timestamp).getTime() / 1000,
            open: openPrice,
            high: dataPoint.high,
            low: dataPoint.low,
            close: dataPoint.close,
          };
          localUpdateCount++;
        }
      } else {
        if (dataPoint.close > candle.high) {
          candle = {
            ...candle,
            high: dataPoint.close,
          };
        } else if (dataPoint.close < candle.low) {
          candle = {
            ...candle,
            low: dataPoint.close,
          };
        }
        localUpdateCount++;
      }
    }

    setUpdateCount(localUpdateCount);
    setCurrentCandle(candle);
    setCandleIndex(index);
    setAllCandles(candles);

    if (localUpdateCount == initialData.length - 1) {
      setOpenFinishModal(true);
      setUpdateCount(initialData.length - 1);
      setIsFullyFinished(true);
      setIsPaused(true);
    }

    return candles;
  };

  const updateChart = () => {
    if (
      !initialData ||
      initialData.length === 0 ||
      updateCount >= initialData.length - 1 ||
      isFullyFinished
    ) {
      return;
    }

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

    if (timeframe === "1h" || timeframe === "4h") {
      currentMinute = new Date(dataPoint.timestamp).getHours();
      previousMinute =
        baseIndex != 0
          ? new Date(initialData[baseIndex - 1].timestamp).getHours()
          : -1;
    } else if (timeframe === "1d") {
      currentMinute = new Date(dataPoint.timestamp).getDay();
      previousMinute =
        baseIndex != 0
          ? new Date(initialData[baseIndex - 1].timestamp).getDay()
          : -1;
    } else {
      currentMinute = new Date(dataPoint.timestamp).getMinutes();
      previousMinute =
        baseIndex != 0
          ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
          : -1;
    }

    if (currentMinute !== previousMinute) {
      const openPrice =
        baseIndex !== 0 ? initialData[baseIndex - 1].close : dataPoint.open;
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

        const storedData = await localforage.getItem(`sessionData_${id}`);
        console.log("Stored data: ", storedData);

        if (storedData && storedData.length > 0) {
          console.log(storedData.length, data.currentCandleIndex);
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
        updateChart();
      }, 1000 / candlePerSecond);
      return () => clearInterval(intervalID);
    } else if (initialData.length != 0 && !isFullyFinished) {
      const candles = getFinalCandles(recoverCandleIndex);

      for (var i = 0; i < candles.length; i++) {
        try {
          seriesRef.current.update(candles[i]);
        } catch (error) {
          console.error(error);
        }
      }
      setRecoverSession(false);
    } else if (isFullyFinished && !isPaused) {
      setOpenFinishModal(true);
    }
  }, [
    initialData,
    isPaused,
    candleIndex,
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
      lineWidth: 2,
      lineStyle: 2,
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

  function getBusinessDayBeforeCurrentAt(date, daysDelta) {
    const dateWithDelta = new Date(
      Date.UTC(date.year, date.month - 1, date.day - daysDelta, 0, 0, 0, 0),
    );
    return {
      year: dateWithDelta.getFullYear(),
      month: dateWithDelta.getMonth() + 1,
      day: dateWithDelta.getDate(),
    };
  }

  const convertToCandlestickData = (data) => {
    return data.map((item) => ({
      time: item.timestamp / 1000, // Convertir a segundos
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
  };
  /*
  const handleRangeChange = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      const logicalRange = chartRef.current
        .timeScale()
        .getVisibleLogicalRange();
      console.log(logicalRange);
      if (logicalRange !== null) {
        const fromIndex = Math.max(0, Math.floor(logicalRange.from) - 10); // Añade 10 velas antes
        const toIndex = Math.min(
          initialData.length - 1,
          Math.ceil(logicalRange.to) + 10,
        ); // Añade 10 velas después
        const visibleData = initialData.slice(fromIndex, toIndex + 1);
        const candlestickData = convertToCandlestickData(visibleData);
        console.log(candlestickData);
        seriesRef.current.setData(candlestickData);
      }
      timerRef.current = null;
    }, 100);
    };*/

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
                  //handleRangeChange={handleRangeChange} // Agregado el handleRangeChange
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
