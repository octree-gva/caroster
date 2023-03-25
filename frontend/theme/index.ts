import {createTheme} from '@mui/material/styles';
import * as typography from './typography';

export const caroster = {
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#FFEB3B',
    },
    error: {
      light: '#efbcc4',
      main: '#d4485e',
    },
    background: {
      default: '#F4F4FF',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&&&&:hover:before': {
            borderBottomColor: '#009688',
          },
        },
      },
    },
  },
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 960,
      lg: 1280,
      xl: 1680,
    },
  },
};

export default createTheme(caroster);
