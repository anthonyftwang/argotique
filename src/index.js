import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import config from './aws-exports';
import './index.css';

Amplify.configure(config);

const theme = createTheme({
  palette: {
    primary: {
      main: '#0055a4',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#ef4135',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
