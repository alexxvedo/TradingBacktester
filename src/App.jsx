import React, { useEffect, useState, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import axios from "axios";
import { processData } from "./utils/dataUtils";
import "./App.css";

export const ChartComponent = ({ initialData }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const indexRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderSize, setOrderSize] = useState(1);
  const [pnl, setPnl] = useState(0);
  const [unrealizedPnl, setUnrealizedPnl] = useState(0);

  useEffect(() => {
    if (!chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "white" },
          textColor: "black",
        },
        width: 1200,
        height: 800,
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
          borderColor: "#fff000",
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

      return () => {
        chart.remove();
      };
    }

    if (initialData.length > 0 && indexRef.current === 0) {
      seriesRef.current.update(initialData[0]);
      setCurrentPrice(initialData[0].close);
      indexRef.current = 1;
    }
  }, [initialData]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!isPaused && indexRef.current < initialData.length) {
        const newData = initialData[indexRef.current];
        seriesRef.current.update(newData);
        setUnrealizedPnl(() => {
          let total = 0;
          orders.forEach((order) => {
            total +=
              (newData.close - order.entryPrice) *
              order.size *
              (order.type === "buy" ? 1 : -1);
          });
          console.log(total);
          return total;
        });
        setCurrentPrice(newData.close);

        indexRef.current += 1;
      }
    }, 2000);

    return () => clearInterval(intervalID);
  }, [isPaused, initialData, orders]);

  const handleOrderSubmit = (type, size) => {
    const newOrder = {
      type,
      size,
      entryPrice: currentPrice,
      id: orders.length + 1,
    };
    setOrders([...orders, newOrder]);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const closePosition = (key) => () => {
    // Cálculo del P/L
    const order = orders.find((order) => order.id === key);
    setPnl(
      pnl +
        (currentPrice - order.entryPrice) *
          order.size *
          (order.type === "buy" ? 1 : -1)
    );
    setOrders(orders.filter((order) => order.id !== key));
  };

  return (
    <div className="container">
      <div className="chartArea">
        <div ref={chartContainerRef} className="chart" />
        <div className="operaciones">
          <h4>Precio actual: {currentPrice.toFixed(5)}</h4>
          <h5>P/L: {pnl.toFixed(2)}</h5>
          <h5>Unrealized P/L: {unrealizedPnl.toFixed(2)}</h5>
          <div className="operaciones-botones">
            <button
              onClick={() => handleOrderSubmit("buy", parseFloat(orderSize))}
              className="boton-buy"
            >
              Comprar {orderSize} unidad
            </button>
            <input
              value={orderSize}
              type="number"
              placeholder="Cantidad"
              onChange={(e) => {
                setOrderSize(e.target.value);
              }}
            />
            <button
              onClick={() => handleOrderSubmit("sell", parseFloat(orderSize))}
              className="boton-sell"
            >
              Vender {orderSize} unidad
            </button>
          </div>

          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                {order.type.toUpperCase()} {order.size} at{" "}
                {order.entryPrice.toFixed(5)}- P/L:{" "}
                {(
                  (currentPrice - order.entryPrice) *
                  order.size *
                  (order.type === "buy" ? 1 : -1)
                ).toFixed(5)}
                <span
                  className="closePosition"
                  onClick={closePosition(order.id)}
                >
                  {" "}
                  x Close
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={togglePause}>{isPaused ? "Reanudar" : "Pausar"}</button>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "/data/EURUSD_Candlestick_1_M_BID_22.04.2024-27.04.2024.csv"
      );
      const processedData = processData(response.data);
      setData(processedData);
    };

    fetchData();
  }, []);

  return <ChartComponent initialData={data} />;
}
