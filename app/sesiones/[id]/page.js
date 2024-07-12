"use client";

import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "next/navigation"; // Importar useParams
import { createChart } from "lightweight-charts";
import PositionCreator from "@/components/PositionCreator";
import { Button } from "@nextui-org/button";
import PauseIcon from "@/public/pause.svg";
import RewindIcon from "@/public/rewind.svg";
import FastForwardIcon from "@/public/forward.svg";
import Save from "@/public/save.svg";
import PlayIcon from "@/public/play.svg";
import Image from "next/image";
import { Slider } from "@nextui-org/slider";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import PositionPanel from "@/components/Sesiones/PositionPanel";
import { Spinner } from "@nextui-org/spinner";

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

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch("/api/dates");
      const dates = await response.json();
      setAvailableDates(dates.map((date) => new Date(date)));
    } catch (error) {
      console.error("Failed to load available dates:", error);
    }
  };

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
        }&offset=${fetchingOffset}`,
      );
      const data = await response.json();

      if (data.length < 5000) setIsFinished(true);
      if (offset === 0) {
        setInitialData(data);
      } else {
        setInitialData((prevData) => [...prevData, ...data]);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Failed to load data by date range:", error);
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

  useEffect(() => {
    if (lineSeries != null) {
      const sortedMarkers = markers.sort((a, b) => a.time - b.time);
      console.log(sortedMarkers);
      lineSeries.setData([]);
      lineSeries.setData(
        sortedMarkers.map((marker) => ({
          time: marker.time,
          value: marker.value,
        })),
      );
      lineSeries.setMarkers(
        sortedMarkers.map((marker) => ({
          time: marker.time,
          position: marker.type === "buy" ? "belowBar" : "aboveBar",
          shape: marker.type === "buy" ? "arrowUp" : "arrowDown",
          color: marker.type === "buy" ? "#f68410" : "#f68410",
          text:
            marker.type === "buy"
              ? "Buy " + marker.size + " @ " + marker.value
              : "Sell " + marker.size + " @ " + marker.value,
        })),
      );
    }
  }, [markers, lineSeries]);

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    setRecoverSession(true);

    const fetchSessionData = async () => {
      setIsLoading(true); // Ocultar el modal de carga

      const res = await fetch(`/api/sessions/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAccountSize(data.accountSize);
        setCurrentBalance(data.currentBalance);
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
      setIsLoading(false); // Ocultar el modal de carga
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
      setLineSeries(
        chart.addLineSeries({
          color: "rgba(255, 255, 255, 0)", // hide or show the line by setting opacity
          lastValueVisible: false, // hide value from y axis
          priceLineVisible: false,
        }),
      );
      chartRef.current = chart;
    }
  }, []);

  const getFinalCandles = (index) => {
    if (!initialData || initialData.length === 0) {
      return;
    }

    var candles = [];
    var candle = {};
    var localUpdateCount = 0;

    while (localUpdateCount < (index != 0 ? index - 1 : index)) {
      console.log(localUpdateCount, index - 1);

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

    if (localUpdateCount == initialData.length) {
      setOpenFinishModal(true);
      console.log("Hola2");
      setUpdateCount(updateCount + 1);
      setIsFullyFinished(true);
      setIsPaused(true);
    }

    return candles;
  };

  const updateChart = () => {
    if (
      !initialData ||
      initialData.length === 0 ||
      updateCount > initialData.length
    )
      return;

    const updatesPerCandle = 60; // Cada vela se actualiza con 60 datos de un segundo

    if (isPaused) return;

    if (updateCount == initialData.length && !isFullyFinished) {
      setOpenFinishModal(true);
      console.log("Hola2");
      setUpdateCount(updateCount + 1);
      setIsFullyFinished(true);
      setIsPaused(true);
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
    if (
      updateCount + 2000 == initialData.length &&
      !isFinished &&
      !openFinishModal
    ) {
      console.log("Fetching more data");
      if (!dataUpdated) {
        setDataUpdated(true);
        console.log(initialData.length, updateCount, offset);
        fetchCSVDataByDateRange({
          start: startDate,
          end: endDate,
          fetchingOffset: offset,
        });
        setOffset(offset + 5000);
      }
    }
  };

  useEffect(() => {
    if (!recoverSession && !isFullyFinished) {
      const intervalID = setInterval(() => {
        updateChart();
      }, 1000 / candlePerSecond); // Actualiza cada segundo
      return () => clearInterval(intervalID);
    } else if (!isFullyFinished) {
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
      } else if (isFullyFinished && !isPaused) {
        setOpenFinishModal(true);
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
    <div className="flex flex-col min-h-[100%] min-w-full p-4 gap-4 border-2 border-zinc-600 rounded-lg">
      <div
        className={`flex flex-row ${panelOpen ? "min-h-[70%] max-h-[70%]" : "min-h-[92%] max-h-[92%]"}  min-w-full p-4 border-2 border-zinc-600 rounded-lg items-center justify-between`}
      >
        <div className="flex flex-col h-full max-w-[80%] min-w-[80%] ">
          <div
            className="min-w-[80%] min-h-[90%] max-h-full rounded-lg"
            ref={chartContainerRef}
          />
          <div className="flex items-center justify-center gap-4 mt-4 max-h-[5%]">
            <Button variant="ghost" size="icon">
              <Image src={RewindIcon} alt="Rewind" className="h-5 w-5" />
              <span className="sr-only">Rewind</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePause}>
              <Image
                src={!isPaused ? PauseIcon : PlayIcon}
                alt="Pause"
                className="h-5 w-5"
              />
              <span className="sr-only">Pause</span>
            </Button>
            <Slider
              color={"foreground"}
              aria-label="Speed"
              minValue={1}
              maxValue={300}
              value={candlePerSecond}
              onChange={setCandlePerSecond}
            />
            <Button variant="ghost" size="icon">
              <Image
                src={FastForwardIcon}
                alt="Fast Forward"
                className="h-5 w-5"
              />
            </Button>
            <Button color="success" size="icon" onClick={saveSessionData}>
              <Image src={Save} alt="Fast Forward" className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex gap-4 max-w-[20%] min-h-full p-6 border-2 rounded-lg border-zinc-700 bg-zinc-900 ">
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
        className={`${panelOpen ? "max-h-[28%] min-h-[28%]" : "max-h-[5%] h-[5%]"} w-full min-w-full`}
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
          console.log("Hola");
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
