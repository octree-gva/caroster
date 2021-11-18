import {createMuiTheme} from '@material-ui/core/styles';

export const caroster = {
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#FFEB3B',
    },
    background: {
      default: '#F4F4FF',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#242424',
        color: 'white',
      },
    },
    MuiInput: {
      underline: {
        '&&&&:hover:before': {
          borderBottomColor: '#009688',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default createMuiTheme(caroster);
