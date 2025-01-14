import React from "react";
import ReactDOM from "react-dom/client"; // Use `react-dom/client` instead of `react-dom`
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

const rootElement = document.getElementById("root");

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
