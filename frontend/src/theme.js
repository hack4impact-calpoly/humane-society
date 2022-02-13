import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#4aa7ac',
      contrastText: '#ffffff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
