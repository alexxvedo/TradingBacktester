"use client";
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import necesario para Chart.js v3+

const SesionCard = ({ sesion }) => {
  // Datos para el gráfico
  const data = {
    labels: [
      "Total Operations",
      "Profit/Loss",
      "Average Gain",
      "Max Drawdown",
      "Win Rate",
    ], // Etiquetas para el gráfico
    datasets: [
      {
        label: "Performance Metrics",
        data: [
          sesion.totalOperations,
          sesion.profitLoss,
          sesion.averageGain,
          -sesion.maxDrawdown, // Negativo para ilustrar como caída
          sesion.winRate,
        ],
        fill: false,
        backgroundColor: "rgb(132, 99, 255)",
        borderColor: "rgba(132, 99, 255, 0.2)",
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full bg-zinc-800 rounded-xl p-4 flex flex-col gap-4">
      <h3 className="text-white text-xl font-bold">{sesion.title}</h3>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-white text-sm font-bold">Date:</p>
          <p className="text-white text-sm">{sesion.date}</p>
        </div>
        <div>
          <p className="text-white text-sm font-bold">Time:</p>
          <p className="text-white text-sm">{sesion.time}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-white text-sm font-bold">Total Operations:</p>
          <p className="text-white text-sm">{sesion.totalOperations}</p>
        </div>
        <div>
          <p className="text-white text-sm font-bold">Profit/Loss:</p>
          <p
            className={`text-sm ${
              sesion.profitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {sesion.profitLoss.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-white text-sm font-bold">Average Gain:</p>
          <p
            className={`text-sm ${
              sesion.averageGain >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {sesion.averageGain.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-white text-sm font-bold">Max Drawdown:</p>
          <p className="text-sm text-yellow-500">
            {sesion.maxDrawdown.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-white text-sm font-bold">Win Rate:</p>
          <p className="text-sm text-green-500">{sesion.winRate.toFixed(1)}%</p>
        </div>
      </div>
      <div className="w-full" style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SesionCard;
