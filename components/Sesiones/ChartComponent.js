import { toIterator } from "@nextui-org/system";
import { createChart, LineStyle } from "lightweight-charts";
import { useEffect, useState, useRef } from "react";

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
}) {
  const [dragging, setDragging] = useState({ isDragging: false, index: null });

  /**
   * Updates the colors of the chart to match the current theme.
   */
  const updateChartColors = () => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        // Set the background color of the chart
        layout: {
          background: {
            color: theme === "dark" ? "#27272A" : "#efefef",
          },
          // Set the text color of the chart
          textColor: theme === "dark" ? "#efefef" : "#27272A",
        },
        // Set the colors of the grid lines
        grid: {
          vertLines: {
            color: theme === "dark" ? "#414141" : "#a1a1a1",
          },
          horzLines: {
            color: theme === "dark" ? "#414141" : "#a1a1a1",
          },
        },
      });

      // Set the colors of the series
      seriesRef.current.applyOptions({
        // Green color for up candles
        upColor: "#26a69a",
        // Red color for down candles
        downColor: "#ef5350",
        // Hide the border of the series
        borderVisible: false,
        // Green color for up wicks
        wickUpColor: "#26a69a",
        // Red color for down wicks
        wickDownColor: "#ef5350",
      });
    }
  };

  /**
   * Updates the line series with the markers sorted by time.
   * The line series is updated with the sorted markers data.
   * The markers are sorted by time and then mapped to the required format
   * for the line series.
   *
   * @return {void} No return value
   */
  useEffect(() => {
    // Only update the line series if it exists
    if (lineSeries != null) {
      // Sort the markers by time
      const sortedMarkers = markers.sort((a, b) => a.time - b.time);

      // Clear the line series data
      lineSeries.setData([]);
      // Set the line series data with the sorted markers data
      lineSeries.setData(
        sortedMarkers.map((marker) => ({
          time: marker.time,
          value: marker.value,
        })),
      );
      // Set the markers for the line series with the sorted markers data
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
  }, [markers, lineSeries]); // Only update when markers or lineSeries change

  /**
   * Creates the chart and sets up the initial options.
   */
  useEffect(() => {
    if (!chartRef.current && chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        // Set the chart to automatically resize
        autoSize: true,

        // Set the layout options
        layout: {
          // Set the background color of the chart
          background: {
            color: theme === "dark" ? "#27272A" : "#cfcfcf",
          },
          // Set the text color of the chart
          textColor: theme === "light" ? "#27272A" : "#ffffff",
        },

        // Set the grid options
        grid: {
          // Set the color of the vertical grid lines
          vertLines: { color: theme === "light" ? "#818181" : "#414141" },
          // Set the color of the horizontal grid lines
          horzLines: { color: theme === "light" ? "#818181" : "#414141" },
        },

        // Set the time scale options
        timeScale: {
          // Set the right offset of the time scale
          rightOffset: 12,
          // Set the bar spacing of the time scale
          barSpacing: 5,
          // Set the time scale to not be fixed to the left edge
          fixLeftEdge: false,
          // Set the time scale to not be visible
          lockVisibleTimeRangeOnResize: true,
          // Set the right bar to stay on scroll
          rightBarStaysOnScroll: true,
          // Set the border of the time scale to not be visible
          borderVisible: false,
          // Set the border color of the time scale
          borderColor: "#313131",
          // Set the time scale to be visible
          visible: true,
          // Set the time scale to be visible on the x axis
          timeVisible: true,
        },

        // Set the localization options
        localization: {
          // Set the time formatter for the time scale
          timeFormatter: (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleString();
          },
        },
      });

      chartRef.current = chart;

      // Create the candlestick series
      seriesRef.current = chart.addCandlestickSeries({
        // Set the price format for the series
        priceFormat: {
          type: "price",
          precision: 5,
          minMove: 0.00001,
        },
        // Set the up color for the series
        upColor: "#26a69a",
        // Set the down color for the series
        downColor: "#ef5350",
        // Set the border visible for the series
        borderVisible: false,
        // Set the up wick color for the series
        wickUpColor: "#26a69a",
        // Set the down wick color for the series
        wickDownColor: "#ef5350",
      });

      // Create the line series
      setLineSeries(
        chart.addLineSeries({
          // Set the color of the line to be white with 0 opacity (hide the line)
          color: "rgba(255, 255, 255, 0)",
          // Set the last value to be visible
          lastValueVisible: false,
          // Set the price line to be visible
          priceLineVisible: false,
        }),
      );
    } else {
      // Update the chart colors if the theme changes
      updateChartColors();
    }
  }, [theme, timeZone]);

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
        // Ajusta la tolerancia si es necesario
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

      /*return () => {
        chartContainerRef.current.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
        chartContainerRef.current.removeEventListener(
          "mousedown",
          handleMouseDown,
        );
        chartContainerRef.current.removeEventListener("mouseup", handleMouseUp);
        };*/
    }
  }, [priceLines, dragging]);

  return (
    <div
      className="min-w-[80%] min-h-[90%] max-h-full rounded-lg w-full h-[80vh]"
      ref={chartContainerRef}
    />
  );
}
