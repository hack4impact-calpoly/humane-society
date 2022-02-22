import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
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
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#4aa7ac',
          '&active': {
            color: '#4aa7ac',
          },
        },
      },
    },
  },
});

export default theme;
