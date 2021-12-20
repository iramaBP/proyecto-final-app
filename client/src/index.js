/*IMPORTAN react y react DOM */
import React from "react";
import ReactDOM from "react-dom";

/* IMPORTO ROUTER */

import { BrowserRouter } from "react-router-dom";

/*toda la aplicacion la vamos a montar dentro de <APP/> */
/* IMPORTAN APP*/
import App from "./App";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
