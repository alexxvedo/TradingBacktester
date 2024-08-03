import React, { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function ChartComponent({
  isLoading,
  chartContainerRef,
  chartRef,
  seriesRef,
  lineSeries,
  setLineSeries,
  markers,
  timeZone,
  theme,
  priceLines,
  setPriceLines,
  orders,
  setOrders,
  chartColors,
  //handleRangeChange,
}) {
  const [dragging, setDragging] = useState({ isDragging: false, index: null });

  const updateChartColors = () => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        layout: {
          background: {
            color:
              chartColors &&
              chartColors.background &&
              chartColors.background !== "#27272A" &&
              chartColors.background !== "#efefef"
                ? chartColors.background
                : theme === "dark"
                ? "#27272A"
                : "#efefef",
          },
          textColor:
            chartColors &&
            chartColors.textColor &&
            chartColors.textColor !== "#27272A" &&
            chartColors.textColor !== "#efefef"
              ? chartColors.textColor
              : theme === "dark"
              ? "#efefef"
              : "#27272A",
        },
        grid: {
          vertLines: {
            color:
              chartColors &&
              chartColors.verticalLines &&
              chartColors.verticalLines !== "#a1a1a1" &&
              chartColors.verticalLines !== "#414141"
                ? chartColors.verticalLines
                : theme === "dark"
                ? "#414141"
                : "#a1a1a1",
          },
          horzLines: {
            color:
              chartColors &&
              chartColors.horizontalLines &&
              chartColors.horizontalLines !== "#a1a1a1" &&
              chartColors.horizontalLines !== "#414141"
                ? chartColors.horizontalLines
                : theme === "dark"
                ? "#414141"
                : "#a1a1a1",
          },
        },
      });

      seriesRef.current.applyOptions({
        upColor:
          chartColors && chartColors.upColor ? chartColors.upColor : "#26a69a",
        downColor:
          chartColors && chartColors.downColor
            ? chartColors.downColor
            : "#ef5350",
        borderVisible: false,
        wickUpColor:
          chartColors && chartColors.wickUp ? chartColors.wickUp : "#26a69a",
        wickDownColor:
          chartColors && chartColors.wickDown
            ? chartColors.wickDown
            : "#ef5350",
      });
    }
  };

  useEffect(() => {
    if (lineSeries != null) {
      const sortedMarkers = markers.sort((a, b) => a.time - b.time);

      lineSeries.setData([]);
      lineSeries.setData(
        sortedMarkers.map((marker) => ({
          time: marker.time,
          value: marker.value,
        }))
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
        }))
      );
    }
  }, [markers, lineSeries]);

  useEffect(() => {
    if (!chartRef.current && chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        autoSize: true,
        layout: {
          background: {
            color:
              chartColors && chartColors.background
                ? chartColors.background
                : theme === "dark"
                ? "#27272A"
                : "#efefef",
          },
          textColor:
            chartColors && chartColors.textColor
              ? chartColors.textColor
              : theme === "dark"
              ? "#efefef"
              : "#27272A",
        },
        grid: {
          vertLines: {
            color:
              chartColors && chartColors.verticalLines
                ? chartColors.verticalLines
                : theme === "dark"
                ? "#414141"
                : "#a1a1a1",
          },
          horzLines: {
            color:
              chartColors && chartColors.horizontalLines
                ? chartColors.horizontalLines
                : theme === "dark"
                ? "#414141"
                : "#a1a1a1",
          },
        },
        timeScale: {
          rightOffset: 12,
          barSpacing: 5,
          fixLeftEdge: false,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          borderVisible: false,
          borderColor:
            chartColors && chartColors.border ? chartColors.border : "#313131",
          visible: true,
          timeVisible: true,
        },
        localization: {
          timeFormatter: (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleString();
          },
        },
      });

      chartRef.current = chart;
      seriesRef.current = chart.addCandlestickSeries({
        priceFormat: {
          type: "price",
          precision: 5,
          minMove: 0.00001,
        },
        upColor:
          chartColors && chartColors.upColor ? chartColors.upColor : "#26a69a",
        downColor:
          chartColors && chartColors.downColor
            ? chartColors.downColor
            : "#ef5350",
        borderVisible: false,
        wickUpColor:
          chartColors && chartColors.wickUp ? chartColors.wickUp : "#26a69a",
        wickDownColor:
          chartColors && chartColors.wickDown
            ? chartColors.wickDown
            : "#ef5350",
      });

      setLineSeries(
        chart.addLineSeries({
          color: "rgba(255, 255, 255, 0)",
          lastValueVisible: false,
          priceLineVisible: false,
        })
      );

      //chart.timeScale().subscribeVisibleLogicalRangeChange(handleRangeChange);
    } else {
      updateChartColors();
    }
  }, [theme, timeZone, chartColors]);

  const handleMouseMove = (event) => {
    if (!dragging.isDragging || dragging.index === null) return;

    const rect = chartContainerRef.current.getBoundingClientRect();
    const price = seriesRef.current.coordinateToPrice(event.clientY - rect.top);

    const updatedPriceLines = [...priceLines];
    updatedPriceLines[dragging.index].applyOptions({
      price,
      title:
        updatedPriceLines[dragging.index].options().lineType === "tp"
          ? "TP @ " + price.toFixed(5)
          : "SL @ " + price.toFixed(5),
    });

    setPriceLines(updatedPriceLines);
  };

  const handleMouseDown = (event) => {
    const rect = chartContainerRef.current.getBoundingClientRect();
    const price = seriesRef.current.coordinateToPrice(event.clientY - rect.top);

    priceLines.forEach((priceLine, index) => {
      const priceLinePrice = parseFloat(priceLine.options().price.toFixed(5));
      const roundedPrice = parseFloat(price.toFixed(5));
      const isPriceLineDrawable = priceLine.options().draggable;

      if (
        Math.abs(roundedPrice - priceLinePrice) < 0.0001 &&
        isPriceLineDrawable
      ) {
        setDragging({ isDragging: true, index });
        chartRef.current.applyOptions({
          handleScroll: false,
          handleScale: false,
        });
      }
    });
  };

  const handleMouseUp = () => {
    if (dragging.index !== null) {
      const updatedPriceLines = [...priceLines];
      const priceLine = updatedPriceLines[dragging.index];
      const price = priceLine.options().price;

      const updatedOrders = orders.map((order) => {
        if (order.id === priceLine.options().positionId) {
          if (priceLine.options().lineType === "tp") {
            const updatedOrder = {
              ...order,
              tp: price.toFixed(5),
            };
            return updatedOrder;
          } else if (priceLine.options().lineType === "sl") {
            return {
              ...order,
              sl: price.toFixed(5),
            };
          }
        }
        return order;
      });

      setOrders(updatedOrders);
    }

    setDragging({ isDragging: false, index: null });
    chartRef.current.applyOptions({
      handleScroll: true,
      handleScale: true,
    });
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      chartContainerRef.current.addEventListener("mousemove", handleMouseMove);
      chartContainerRef.current.addEventListener("mousedown", handleMouseDown);
      chartContainerRef.current.addEventListener("mouseup", handleMouseUp);

      return () => {
        if (chartContainerRef.current) {
          chartContainerRef.current.removeEventListener(
            "mousemove",
            handleMouseMove
          );
          chartContainerRef.current.removeEventListener(
            "mousedown",
            handleMouseDown
          );
          chartContainerRef.current.removeEventListener(
            "mouseup",
            handleMouseUp
          );
        }
        /*if (chartRef.current) {
          chartRef.current
            .timeScale()
            .unsubscribeVisibleLogicalRangeChange(handleRangeChange);
            }*/
      };
    }
  }, [priceLines, dragging]);

  return (
    <div
      className="min-w-[80%] min-h-[90%] max-h-full rounded-lg w-full h-[80vh]"
      ref={chartContainerRef}
    />
  );
}
