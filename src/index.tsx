import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18n from '../i18n';
import App from './App';
import '@genflowly/react-assets/dist/dist/main.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
