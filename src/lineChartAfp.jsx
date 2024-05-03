import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { registerables } from "chart.js";
ChartJS.register(...registerables);

export default function LineCHartAfp() {
  const fechaActual = new Date();
  const [datos, setDatos] = useState([]);
  const [datosCapital, setDatosCapital] = useState([]);
  const [datosCuprum, setDatosCuprum] = useState([]);
  const [datosHabitat, setDatosHabitat] = useState([]);
  const [datosModelo, setDatosModelo] = useState([]);
  const [datosPlanVital, setDatosPlanVital] = useState([]);
  const [datosProVida, setDatosProVida] = useState([]);
  const [datosUno, setDatosUno] = useState([]);

  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const año = fechaActual.getFullYear();

  console.log(`Hoy es ${dia}/${mes}/${año}`);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.quetalmiafp.cl/api/Cuota/ObtenerCuotas?listaAFPs=CAPITAL%2CCUPRUM%2CMODELO&listaFondos=A%2CB%2CC%2CD%2CE&fechaInicial=01%2F01%2F2024&fechaFinal=${dia}%2F${mes}%2F${año}`
      );
      const data = await response.json();
      setDatos(data);
      setDatosCapital(data.filter((dato) => dato.afp === "CAPITAL"));
      setDatosCuprum(data.filter((dato) => dato.afp === "CUPRUM"));
      setDatosHabitat(data.filter((dato) => dato.afp === "HABITAT"));
      setDatosModelo(data.filter((dato) => dato.afp === "MODELO"));
      setDatosPlanVital(data.filter((dato) => dato.afp === "PLANVITAL"));
      setDatosProVida(data.filter((dato) => dato.afp === "PROVIDA"));
      setDatosUno(data.filter((dato) => dato.afp === "UNO"));
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  console.log(datosCapital);

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
    animations: {
      radius: {
        duration: 400,
        easing: "linear",
        loop: (context) => context.active,
      },
    },
  };

  const data = {
    labels: datos.map((item) => item.fecha),
    datasets: [
      {
        label: "Cuprum",
        data: datosCuprum
          .filter((item) => item.fondo === "A")
          .map((item) => item.valor),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
      },
      {
        label: "Capital",
        data: datosCapital
          .filter((item) => item.fondo === "A")
          .map((item) => item.valor),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(255, 163, 163)",
        backgroundColor: "rgb(255, 0, 0)",
      },
      {
        label: "Modelo",
        data: datosModelo
          .filter((item) => item.fondo === "A")
          .map((item) => item.valor),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(3, 112, 12)",
        backgroundColor: "rgb(0, 0, 0))",
      },
    ],
  };
  return <Line data={data} options={options} />;
}
