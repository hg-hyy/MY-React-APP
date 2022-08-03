import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/layout/App";
import "./assets/material-react.css";
import "./assets/App.css";
import * as serviceWorker from "./serviceWorker";
// import store from "./reducers/store";
import store from "./reducers/appStore";
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
