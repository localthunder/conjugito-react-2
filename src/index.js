import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your App component
import './index.css';
import './styles/fonts.css'
import reportWebVitals from './reportWebVitals';

// Render your App component in place of the "Hello, world!" element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
