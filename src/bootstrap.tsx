import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18n from '../i18n';
import App from './App';
import '@genflowly/react-assets/dist/dist/main.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

i18n.init({
  fallbackLng: 'en',
  debug: true,
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
