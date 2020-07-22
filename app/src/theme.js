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
};

export default createMuiTheme(caroster);
