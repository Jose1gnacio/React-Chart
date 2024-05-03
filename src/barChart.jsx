import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { registerables } from "chart.js";
ChartJS.register(...registerables);

export default function BarChart() {
  const [dolarData, setDolarData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();
      setDolarData(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels: dolarData.map((item) => item.nombre),
    datasets: [
      {
        label: "Compra",
        data: dolarData.map((item) => item.compra),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(0, 255, 21)",
        backgroundColor: "rgb(0, 147, 12)",
      },
      {
        label: "Venta",
        data: dolarData.map((item) => item.venta),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(237, 92, 92)",
        backgroundColor: "rgb(170, 75, 75)",
      },
    ],
  };
  return <Bar data={data} options={options} />;
}
