import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'; // Підключаємо normalize.css
import './index.css'; // Підключаємо глобальні стилі
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
