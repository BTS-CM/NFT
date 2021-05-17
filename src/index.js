import React from 'react';
import App from './App';
import './i18n';
import { hydrate, render } from "react-dom";

const rootElement = document.querySelector("#root");
if (rootElement.hasChildNodes()) {
  hydrate(<React.StrictMode><App /></React.StrictMode>, rootElement);
} else {
  render(<React.StrictMode><App /></React.StrictMode>, rootElement);
}
