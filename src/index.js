import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

import { BrowserRouter} from "react-router-dom";
import App from './App';

axios.defaults.baseURL = "http://localhost:3001/";

ReactDOM.render(
  <BrowserRouter> <App /></BrowserRouter> ,
  document.getElementById('root')
);

reportWebVitals();
