import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { registerables } from "chart.js";
ChartJS.register(...registerables);

export default function LineCHartAfp() {
  const [cuprumData, setCuprumData] = useState([]);
  const [capitalData, setCapitalData] = useState([]);
  const [modeloData, setModeloData] = useState([]);

  const fetchCuprumData = async () => {
    try {
      const response = await fetch(
        "https://www.quetalmiafp.cl/api/Cuota/ObtenerCuotas?listaAFPs=CUPRUM&listaFondos=A%2CB%2CC%2CD%2CE&fechaInicial=01%2F05%2F2024&fechaFinal=02%2F05%2F2024"
      );
      const data = await response.json();
      setCuprumData(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const fetchCapitalData = async () => {
    try {
      const response = await fetch(
        "https://www.quetalmiafp.cl/api/Cuota/ObtenerCuotas?listaAFPs=CAPITAL&listaFondos=A%2CB%2CC%2CD%2CE&fechaInicial=01%2F05%2F2024&fechaFinal=02%2F05%2F2024"
      );
      const data = await response.json();
      setCapitalData(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const fetchModeloData = async () => {
    try {
      const response = await fetch(
        "https://www.quetalmiafp.cl/api/Cuota/ObtenerCuotas?listaAFPs=MODELO&listaFondos=A%2CB%2CC%2CD%2CE&fechaInicial=01%2F05%2F2024&fechaFinal=02%2F05%2F2024"
      );
      const data = await response.json();
      setModeloData(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchCuprumData();
    fetchCapitalData();
    fetchModeloData();
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
    animations: {
      radius: {
        duration: 400,
        easing: "linear",
        loop: (context) => context.active,
      },
    },
  };

  const data = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Cuprum",
        data: cuprumData.map((item) => item.valor),
        tension: 0.5,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
      },
      {
        label: "Capital",
        data: capitalData.map((item) => item.valor),
        tension: 0.5,
        fill: false,
        borderColor: "rgb(255, 163, 163)",
        backgroundColor: "rgb(255, 0, 0)",
      },
      {
        label: "Modelo",
        data: modeloData.map((item) => item.valor),
        tension: 0.5,
        fill: false,
        borderColor: "rgb(3, 112, 12)",
        backgroundColor: "rgb(0, 0, 0))",
      },
    ],
  };
  return <Line data={data} options={options} />;
}
