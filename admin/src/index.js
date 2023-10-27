import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import {store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <DarkModeContextProvider>
        <App />
        <ToastContainer />
      </DarkModeContextProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
