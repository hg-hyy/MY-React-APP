import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/layout/App";
import "./assets/material-react.css";
import "./assets/App.css";
import * as serviceWorker from "./serviceWorker";
import store from "./reducers/appStore";
import { selectSubreddit, fetchPosts } from "./reducers/subredditSlice";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("app");
const root = createRoot(container);

store.dispatch(selectSubreddit("reactjs"));
store.dispatch(fetchPosts("reactjs"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={2000}
        preventDuplicate
        iconVariant={{
          success: "✅",
          error: "✖️",
          warning: "⚠️",
          info: "ℹ️",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
