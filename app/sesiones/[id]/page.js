"use client";

import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "next/navigation"; // Importar useParams
import { createChart } from "lightweight-charts";
import PositionCreator from "@/components/PositionCreator";
import { Button } from "@nextui-org/button";
import { processData } from "@/utils/dataParser/dataUtils"; // Importar processData

export default function SessionPage() {
  const { id } = useParams(); // Usar useParams para obtener el id
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentCandle, setCurrentCandle] = useState({});
  const [candleIndex, setCandleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [candlePerSecond, setCandlePerSecond] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [initialData, setInitialData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [recoverSession, setRecoverSession] = useState(false);
  const [recoverCandleIndex, setRecoverCandleIndex] = useState(0);
  const [accountSize, setAccountSize] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch("/api/dates");
      const dates = await response.json();
      setAvailableDates(dates.map((date) => new Date(date)));
    } catch (error) {
      console.error("Failed to load available dates:", error);
    }
  };

  const fetchCSVDataByDateRange = async (start, end) => {
    try {
      const response = await fetch(
        `/api/data?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await response.json();
      console.log(data);
      setInitialData(data);
    } catch (error) {
      console.error("Failed to load data by date range:", error);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      fetchCSVDataByDateRange(start, end);
      setIsPaused(true);
      resetAndLoadSeries();
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
        currentCandleIndex: candleIndex,
      }),
    });

    if (!res.ok) {
      console.error("Failed to save session data");
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    setRecoverSession(true);

    const fetchSessionData = async () => {
      const res = await fetch(`/api/sessions/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAccountSize(data.accountSize);
        setCurrentBalance(data.currentBalance);
        if (data.startDate && data.endDate && data.currentCandleIndex != 0) {
          setStartDate(new Date(data.startDate));
          setEndDate(new Date(data.endDate));
          fetchCSVDataByDateRange(
            new Date(data.startDate),
            new Date(data.endDate)
          );
          setRecoverCandleIndex(data.currentCandleIndex);
        } else {
          setRecoverSession(false);
        }
      } else {
        console.error("Failed to fetch session data");
      }
    };

    if (id) {
      fetchSessionData();
    }
  }, [id]);

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

  useEffect(() => {
    if (!chartRef.current && chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        autoSize: true,
        layout: {
          background: {
            color: "#27272A",
          },
          textColor: "#ffffff",
        },
        grid: {
          vertLines: { color: "#414141" },
          horzLines: { color: "#414141" },
        },
        localization: {
          timeFormatter: (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleString();
          },
        },
        timeScale: {
          rightOffset: 12,
          barSpacing: 5,
          fixLeftEdge: false,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          borderVisible: false,
          borderColor: "#313131",
          visible: true,
          timeVisible: true,
        },
      });
      seriesRef.current = chart.addCandlestickSeries({
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
      chartRef.current = chart;
    }
  }, []);

  const getFinalCandles = (index) => {
    if (!initialData || initialData.length === 0) {
      console.log("No hay data");
      return;
    }
    console.log("Hay data");
    var candles = [];
    var candle = {};
    var localUpdateCount = 0;

    while (candles.length <= index) {
      const baseIndex = localUpdateCount;
      const dataPoint = initialData[baseIndex];

      const currentMinute = new Date(dataPoint.timestamp).getMinutes();
      const previousMinute =
        baseIndex != 0
          ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
          : -1;

      if (currentMinute !== previousMinute) {
        const openPrice =
          baseIndex != 0 ? initialData[baseIndex - 1].close : dataPoint.open; // El precio de apertura es el cierre de la vela anterior

        if (previousMinute != -1) {
          candle = {
            ...candle,
            close: initialData[baseIndex - 1].close,
          };
          candles.push(structuredClone(candle));
          console.log(candles);
          candle = {
            time: new Date(dataPoint.timestamp).getTime() / 1000,
            open: openPrice,
            high: openPrice,
            low: openPrice,
            close: openPrice,
          };
          localUpdateCount++;
        } else {
          candle = {
            time: new Date(dataPoint.timestamp).getTime() / 1000,
            open: openPrice,
            high: openPrice,
            low: openPrice,
            close: openPrice,
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

    return candles;
  };

  const updateChart = () => {
    if (!initialData || initialData.length === 0) return;

    const updatesPerCandle = 60; // Cada vela se actualiza con 60 datos de un segundo

    if (isPaused) return;

    const totalCandles = Math.floor(initialData.length / updatesPerCandle);
    if (candleIndex >= totalCandles) {
      clearInterval(intervalID);
      return;
    }

    const baseIndex = updateCount;
    const dataPoint = initialData[baseIndex];

    const currentMinute = new Date(dataPoint.timestamp).getMinutes();

    const previousMinute =
      baseIndex != 0
        ? new Date(initialData[baseIndex - 1].timestamp).getMinutes()
        : -1;

    if (currentMinute !== previousMinute) {
      // Asegura que la vela nueva comienza exactamente donde la anterior terminó
      const openPrice =
        baseIndex != 0 ? initialData[baseIndex - 1].close : dataPoint.open; // El precio de apertura es el cierre de la vela anterior
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
    }
  };

  useEffect(() => {
    if (!recoverSession) {
      const intervalID = setInterval(() => {
        updateChart();
      }, 1000 / candlePerSecond); // Actualiza cada segundo
      return () => clearInterval(intervalID);
    } else {
      if (initialData.length != 0) {
        const candles = getFinalCandles(recoverCandleIndex);

        for (var i = 0; i < candles.length; i++) {
          try {
            seriesRef.current.update(candles[i]);
          } catch (error) {
            console.log(error);
            console.log(candles[i], candles[i - 1]);
          }
        }
        setRecoverSession(false);
        chartRef.current.applyOptions({ autoSize: true });
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

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <div className="flex flex-col min-h-[100%] min-w-full p-4">
      <div className="flex items-center gap-4 mb-4 w-full h-[20%] min-h-[20%] ">
        <div className="flex items-center flex-row gap-4">
          <Button onClick={togglePause} className="w-auto" color="secondary">
            {isPaused ? "Reanudar" : "Pausar"}
          </Button>
          <input
            type="range"
            min="1"
            max="120"
            value={candlePerSecond}
            onChange={(e) => setCandlePerSecond(e.target.value)}
          />
          <Button onClick={saveSessionData} className="w-auto" color="success">
            Save Session
          </Button>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            inline
            monthsShown={1}
            availableDates={availableDates}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date Range"
          />
        </div>
      </div>
      <div className="flex gap-4 min-w-full min-h-[80%] max-h-[80%]">
        <div className="flex flex-col min-w-[70%] max-w-[70%] min-h-full max-h-full gap-4 overflow-y-hidden">
          {recoverSession ? (
            <div className="min-w-full flex flex-col items-center justify-center">
              <p>Loading Graph...</p>
              <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div
              className="min-w-[80%] min-h-full max-h-full"
              ref={chartContainerRef}
            />
          )}
        </div>
        <PositionCreator
          currentPrice={currentPrice}
          currentBalance={currentBalance}
          saveSessionData={saveSessionData}
          sessionId={id}
        />
      </div>
    </div>
  );
}
