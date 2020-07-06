import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logo from './logo.png';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='logo'>
      <img src={logo} alt="Logo" />
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
