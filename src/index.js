import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

import { hydrate, render } from "react-dom";

const rootElement = document.querySelector("#root");
if (rootElement.hasChildNodes()) {
  hydrate(<React.StrictMode><App /></React.StrictMode>, rootElement);
} else {
  render(<React.StrictMode><App /></React.StrictMode>, rootElement);
}
