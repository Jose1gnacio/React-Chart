import { useState } from "react";
import "./App.css";

import LineChartAfp from "./lineChartAfp";

function App() {
  return (
    <>
      <hr />
      <h1>Graficos</h1>
      <hr />
      <br />
      <br />

      <div className="accordion grafico" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              <h3 className="subTitle">Valor Promedio Fondos</h3>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              <LineChartAfp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
