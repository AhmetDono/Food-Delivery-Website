import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'remixicon/fonts/remixicon.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>,
    </Router>
  </React.StrictMode>
);
