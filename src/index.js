import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/layout/App";
import "./assets/material-react.css";
import "./assets/App.css";
import * as serviceWorker from "./serviceWorker";
// eslint-disable-next-line
import { selectSubreddit, fetchPosts } from "./actions/subreddit-actions";
import store from "./reducers/store";
// store.dispatch(selectSubreddit("reactjs"))
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router
      getUserConfirmation={(message, callback) => {
        // this is the default behavior
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      <App />
    </Router>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
