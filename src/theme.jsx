import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  initialColorMode: 'light',
  palette: {
    primary: {
      main: '#4093CE',
    },
    secondary: {
      main: '#98BDFF',
    },
  },
  typography: {
    body1: {
      color: '#000000', // Ensure body text is black
    },
  }
});

export default theme