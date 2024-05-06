import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { registerables } from "chart.js";
ChartJS.register(...registerables);

export default function LineCHartAfp() {
  const fechaActual = new Date();
  const [datos, setDatos] = useState([]);
  const [promedioValorPorDiaFondoA, setPromedioValorPorDiaFondoA] = useState(
    {}
  );
  const [promedioValorPorDiaFondoB, setPromedioValorPorDiaFondoB] = useState(
    {}
  );
  const [promedioValorPorDiaFondoC, setPromedioValorPorDiaFondoC] = useState(
    {}
  );
  const [promedioValorPorDiaFondoD, setPromedioValorPorDiaFondoD] = useState(
    {}
  );
  const [promedioValorPorDiaFondoE, setPromedioValorPorDiaFondoE] = useState(
    {}
  );

  const [fechaInicio, setFechaInicio] = useState(fechaActual);
  const [fechaTermino, setFechaTermino] = useState(fechaActual);

  const diaInicial = fechaInicio.getDate();
  const mesInicial = fechaInicio.getMonth() + 2;
  const añoInicial = fechaInicio.getFullYear();

  const diaFinal = fechaTermino.getDate();
  const mesFinal = fechaTermino.getMonth() + 1;
  const añoFinal = fechaTermino.getFullYear();

  const handleFechaInicio = (e) => {
    const selectedInicio = new Date(e.target.value);
    setFechaInicio(selectedInicio);
  };
  console.log("Fecha de inicio " + fechaInicio);

  const handleFechaTermino = (e) => {
    const selectedTermino = new Date(e.target.value);
    setFechaTermino(selectedTermino);
  };
  console.log(`La fecha de termino es: ${fechaTermino}`);

  //console.log(`Hoy es ${dia}/${mes}/${año}`);

  const generarRangoFechas = (fechaInicio, fechaTermino) => {
    const rangoFechas = [];
    const fechaInicial = new Date(fechaInicio);
    const fechaFin = new Date(fechaTermino);

    for (
      let fecha = new Date(fechaInicial);
      fecha <= fechaFin;
      fecha.setDate(fecha.getDate() + 1)
    ) {
      rangoFechas.push(new Date(fecha));
    }

    return rangoFechas;
  };

  const rangoFechas = generarRangoFechas(
    `${añoInicial}-${mesInicial - 1}-${diaInicial}`,
    `${añoFinal}-${mesFinal}-${diaFinal}`
  );
  console.log("Estas son las fechas " + rangoFechas);

  const fetchData = async () => {
    try {
      /* const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
        method: "GET",
        redirect: "follow",
        mode: "cors",
        cache: "no-cache",
      }; */
      const response = await fetch(
        `https://www.quetalmiafp.cl/api/Cuota/ObtenerCuotas?listaAFPs=CAPITAL%2CCUPRUM%2CHABITAT%2CMODELO%2CPLANVITAL%2CPROVIDA%2CUNO&listaFondos=A%2CB%2CC%2CD%2CE&fechaInicial=${fechaInicio.getDate()}%2F${
          fechaInicio.getMonth() + 1
        }%2F${fechaInicio.getFullYear()}&fechaFinal=${fechaTermino.getDate()}%2F${
          fechaTermino.getMonth() + 1
        }%2F${fechaTermino.getFullYear()}` //,options
      );
      const data = await response.json();
      setDatos(data);

      // Calcular el promedio del "valor" por cada día
      const promedioValorPorDiaFondoA = {};
      const promedioValorPorDiaFondoB = {};
      const promedioValorPorDiaFondoC = {};
      const promedioValorPorDiaFondoD = {};
      const promedioValorPorDiaFondoE = {};

      data.forEach((item) => {
        const { fecha, valor, fondo } = item;
        let promedioValorPorDiaFondo;

        switch (fondo) {
          case "A":
            promedioValorPorDiaFondo = promedioValorPorDiaFondoA;
            break;
          case "B":
            promedioValorPorDiaFondo = promedioValorPorDiaFondoB;
            break;
          case "C":
            promedioValorPorDiaFondo = promedioValorPorDiaFondoC;
            break;
          case "D":
            promedioValorPorDiaFondo = promedioValorPorDiaFondoD;
            break;
          case "E":
            promedioValorPorDiaFondo = promedioValorPorDiaFondoE;
            break;
          default:
            break;
        }

        if (!promedioValorPorDiaFondo[fecha]) {
          promedioValorPorDiaFondo[fecha] = {
            suma: 0,
            count: 0,
            promedio: 0,
          };
        }
        promedioValorPorDiaFondo[fecha].suma += valor;
        promedioValorPorDiaFondo[fecha].count++;
        promedioValorPorDiaFondo[fecha].promedio =
          promedioValorPorDiaFondo[fecha].suma /
          promedioValorPorDiaFondo[fecha].count;
      });

      setPromedioValorPorDiaFondoA(promedioValorPorDiaFondoA);
      setPromedioValorPorDiaFondoB(promedioValorPorDiaFondoB);
      setPromedioValorPorDiaFondoC(promedioValorPorDiaFondoC);
      setPromedioValorPorDiaFondoD(promedioValorPorDiaFondoD);
      setPromedioValorPorDiaFondoE(promedioValorPorDiaFondoE);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaInicio, fechaTermino]);

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
    labels: rangoFechas.map(
      (fecha) =>
        `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
    ),
    datasets: [
      {
        label: "Fondo A",
        data: Object.values(promedioValorPorDiaFondoA).map(
          (item) => item.promedio
        ),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
        pointRadius: 0,
      },
      {
        label: "Fondo B",
        data: Object.values(promedioValorPorDiaFondoB).map(
          (item) => item.promedio
        ),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
        pointRadius: 0,
      },
      {
        label: "Fondo C",
        data: Object.values(promedioValorPorDiaFondoC).map(
          (item) => item.promedio
        ),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
        pointRadius: 0,
      },
      {
        label: "Fondo D",
        data: Object.values(promedioValorPorDiaFondoD).map(
          (item) => item.promedio
        ),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
        pointRadius: 0,
      },
      {
        label: "Fondo E",
        data: Object.values(promedioValorPorDiaFondoE).map(
          (item) => item.promedio
        ),
        tension: 0.1,
        fill: false,
        borderColor: "rgb(119, 107, 255)",
        backgroundColor: "rgb(21, 0, 255)",
        pointRadius: 0,
      },
    ],
  };
  return (
    <div>
      <div>
        <label>Seleccione fecha de inicio: </label>
        <input
          type="date"
          value={fechaInicio.toISOString().split("T")[0]}
          onChange={handleFechaInicio}
        />
      </div>
      <div>
        <label>Seleccione fecha termino: </label>
        <input
          type="date"
          value={fechaTermino.toISOString().split("T")[0]}
          onChange={handleFechaTermino}
        />
      </div>
      <Line data={data} options={options} />
    </div>
  );
}
