import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
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
      minHeight: 64,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'rgba(0,0,0,0.78)',
        color: 'white',
      },
    },
  },
});
