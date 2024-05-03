import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { registerables } from "chart.js";
ChartJS.register(...registerables);

export default function BarChartDivisa() {
  const [divisaData, setDivisaData] = useState([]);
  const urls = [
    "https://cl.dolarapi.com/v1/cotizaciones/usd",
    "https://dolarapi.com/v1/cotizaciones/eur",
    "https://cl.dolarapi.com/v1/cotizaciones/brl",
  ];

  const fetchDivisaData = async () => {
    try {
      const promises = urls.map((url) =>
        fetch(url).then((response) => response.json())
      );
      const data = await Promise.all(promises);
      setDivisaData(data);
    } catch (error) {
      console.error("Error al obtener datos de divisas:", error);
    }
  };

  useEffect(() => {
    fetchDivisaData();
  }, []);

  const options = {
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const data = {
    labels: divisaData.map((item) => item.nombre),
    datasets: [
      {
        label: "Compra",
        data: divisaData.map((item) => item.compra),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(0, 255, 21)",
        backgroundColor: "rgb(0, 147, 12)",
        borderRadius: 9,
      },
      {
        label: "Venta",
        data: divisaData.map((item) => item.venta),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(237, 92, 92)",
        backgroundColor: "rgb(170, 75, 75)",
        borderRadius: 9,
      },
    ],
  };
  return <Bar data={data} options={options} />;
}
