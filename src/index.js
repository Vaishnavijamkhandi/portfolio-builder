import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// TEMPORARY: Remove StrictMode to test
root.render(
  // <React.StrictMode>  {/* COMMENT OUT */}
    <App />
  // </React.StrictMode> {/* COMMENT OUT */}
);