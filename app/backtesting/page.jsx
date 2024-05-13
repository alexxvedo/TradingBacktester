"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "@/components/ChartComponent";
import { processData } from "@/utils/dataParser/dataUtils";

export default function Backtesting() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "/data/EURUSD_Candlestick_1_s_BID_10.05.2024-10.05.2024.csv"
      );
      const processedData = processData(response.data);
      setData(processedData);
    };

    fetchData();
  }, []);

  return (
    <ChartComponent
      initialData={data}
      className="h-full items-center justify-center"
    />
  );
}
