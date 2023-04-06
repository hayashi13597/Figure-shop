import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PayPalScriptProvider options={{ "client-id": "AWxo3Fhm6y8cCAAA2CWpg-nnOca3IKQpMKiORWyUMfP6qYJPsC11OZ3A9yLs4uQnSIkx7SsD12GW0_ET" }}>
            <App />
          </PayPalScriptProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
