import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const thm = createTheme({
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
const theme = responsiveFontSizes(thm);

export default theme;
