import { createTheme } from '@mui/material/styles';

const MuiTheme = createTheme({
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

export default MuiTheme;
