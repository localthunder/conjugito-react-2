import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import your App component
import './index.css';
import './styles/fonts.css'
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

// Use root.render to render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
