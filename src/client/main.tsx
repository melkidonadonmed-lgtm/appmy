import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { useAnatomyStore } from './stores/useAnatomyStore.ts';
if (typeof window !== 'undefined') {
  (window as any).__anatomyStore = useAnatomyStore;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
