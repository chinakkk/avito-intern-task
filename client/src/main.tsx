import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'src/index.css';
import App from 'src/app/App';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
