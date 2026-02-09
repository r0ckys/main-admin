import React from 'react';
import { createRoot } from 'react-dom/client';
import FigmaDashboardContent from './components/dashboard/FigmaDashboardContent';
import './styles/tailwind.css';
import './styles/mobile-enhancements.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <FigmaDashboardContent />
  </React.StrictMode>
);
