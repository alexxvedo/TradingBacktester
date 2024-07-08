import React, { useEffect, useState, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import PositionCreator from "./PositionCreator";
import { Button } from "@nextui-org/button";

//Velas de un minuto que se actualizan cada segundo

export default function ChartComponent({ initialData }) {
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

  // Estado para forzar la actualización al cambiar el tamaño de la ventana
  const [size, setSize] = useState({
    width: window.innerWidth * 0.7,
    height: window.innerHeight * 0.8,
  });

  // Manejador de eventos para actualizar el tamaño
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: size.width,
          height: size.height,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size.width, size.height]); // Dependencias para evitar loops infinitos

  useEffect(() => {
    if (!chartRef.current && chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: size.width,
        height: size.height,
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
  }, [initialData, size.width, size.height]);

  useEffect(() => {
    if (!initialData || initialData.length === 0) return;

    const updatesPerCandle = 60; // Cada vela se actualiza con 60 datos de un segundo
    const intervalID = setInterval(() => {
      if (isPaused) return;

      const totalCandles = Math.floor(initialData.length / updatesPerCandle);
      if (candleIndex >= totalCandles) {
        clearInterval(intervalID);
        return;
      }

      const baseIndex = updateCount;
      const dataPoint = initialData[baseIndex];

      const currentMinute = new Date(dataPoint.time * 1000).getMinutes();

      const previousMinute =
        baseIndex != 0
          ? new Date(initialData[baseIndex - 1].time * 1000).getMinutes()
          : -1;

      if (currentMinute !== previousMinute) {
        // Asegura que la vela nueva comienza exactamente donde la anterior terminó
        const openPrice =
          baseIndex != 0 ? initialData[baseIndex - 1].close : dataPoint.open; // El precio de apertura es el cierre de la vela anterior
        const newCandle = {
          time: dataPoint.time,
          open: openPrice,
          high: openPrice,
          low: openPrice,
          close: openPrice,
        };
        seriesRef.current.update(newCandle);
        setCurrentCandle(newCandle);
        setCurrentPrice(newCandle.close);
        setUpdateCount(updateCount + 1);
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
    }, 1000 / candlePerSecond); // Actualiza cada segundo

    return () => clearInterval(intervalID);
  }, [
    initialData,
    isPaused,
    candleIndex,
    subIndex,
    currentCandle,
    candlePerSecond,
  ]);

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <main className="flex flex-col min-h-screen p-4 items-center justify-center">
      <div className="flex flex-row justify-evenly gap-4  ">
        <div className="flex flex-col w-full h-full gap-4">
          <div ref={chartContainerRef} />
          <div className="flex flex-row gap-4">
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
          </div>
        </div>
        <PositionCreator currentPrice={currentPrice} />
      </div>
    </main>
  );
}
