import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/App';
import { AppProvider } from '@core/contexts/AppContext';
import '@shared/styles/theme.css'; // 👈 должен существовать
import './index.css'; // 👈 должен существовать в src/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);