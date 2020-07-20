import {createMuiTheme} from '@material-ui/core/styles';

export const caroster = {
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ffde03',
    },
    background: {
      default: '#f4f4ff',
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
