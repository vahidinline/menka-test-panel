import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';
import './fonts/IRANSansWeb.ttf';
import Navbars from './component/navbar';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <BrowserRouter>
        <Navbars />

        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
