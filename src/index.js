import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import MuiTheme from './MuiTheme';
import reportWebVitals from './reportWebVitals';
import config from './aws-exports';
import './index.css';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
