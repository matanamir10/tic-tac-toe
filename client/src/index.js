import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import {App} from './containers/App/App';
import {OponentProvider} from './context/Oponent';


ReactDOM.render(
  <React.StrictMode>
    <OponentProvider>
    <App />
    </OponentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

