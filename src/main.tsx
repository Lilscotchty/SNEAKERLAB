import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

requestAnimationFrame(() => {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progress');
  if (progress) progress.textContent = 'Curating the Form: 100%';
  if (loader) loader.classList.add('hidden');
  // Safety net: never let the loader block the site for more than 1.5s
  window.setTimeout(() => loader && loader.classList.add('hidden'), 1500);
});
