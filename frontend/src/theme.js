import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#054D75',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4aa7ac',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Lato',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
