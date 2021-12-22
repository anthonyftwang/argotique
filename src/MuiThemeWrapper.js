import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import MuiTheme from './MuiTheme';

function MuiThemeWrapper({ children }) {
  return <ThemeProvider theme={MuiTheme}>{children}</ThemeProvider>;
}

MuiThemeWrapper.propTypes = { children: PropTypes.element.isRequired };

export default MuiThemeWrapper;
