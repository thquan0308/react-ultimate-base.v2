import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import {
  BrowserRouter
} from "react-router-dom";
import Layout from './Layout';
import { PersistGate } from 'redux-persist/integration/react'
import i18n from './utils/i18n'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css'
import "react-awesome-lightbox/build/style.css"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <Layout />
      </BrowserRouter>

      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);

reportWebVitals();
