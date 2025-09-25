import {createTheme} from '@mui/material/styles';

const weightScale = {
  'Extra Light': 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  'Semi Bold': 600,
};

export default createTheme({
  palette: {
    primary: {
      light: '#0096881a',
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
      // grey: 'rgba(0, 0, 0, 0.67)',
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
  typography: {
    body1: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Regular'],
      fontSize: '14px',
      lineHeight: '19.6px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
      textCase: 'undercase',
    },
    body2: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Regular'],
      fontSize: '12.44px',
      lineHeight: '17.42px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
      textCase: 'undercase',
    },
    button: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Medium'],
      fontSize: '14px',
      lineHeight: '19.6px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
      textCase: 'uppercase',
      textTransform: 'none',
    },
    caption: {
      fontFamily: 'Inter',
      fontWeight: 'Regular',
      fontSize: '12.44px',
      lineHeight: '17.42px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
      textCase: 'undercase',
    },
    overline: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Regular'],
      fontSize: '12.44px',
      lineHeight: '17.42px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
      textTransform: 'none',
    },
    subtitle1: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Medium'],
      fontSize: '15.75px',
      lineHeight: '22.1px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
    subtitle2: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Medium'],
      fontSize: '14px',
      lineHeight: '19.6px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
    h6: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Medium'],
      fontSize: '15.75px',
      lineHeight: '22.1px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
    h5: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Regular'],
      fontSize: '17.72px',
      lineHeight: '24.8px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
      textCase: 'undercase',
    },
    h4: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Medium'],
      fontSize: '19px',
      lineHeight: '26.6px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
    h3: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Semi Bold'],
      fontSize: '22.42px',
      lineHeight: '31.39px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
    h2: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Semi Bold'],
      fontSize: '25.23px',
      lineHeight: '35.32px',
      textDecoration: 'none',
    },
    h1: {
      fontFamily: 'Inter',
      fontWeight: weightScale['Semi Bold'],
      fontSize: '27px',
      lineHeight: '37.8px',
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 960,
      lg: 1280,
      xl: 1680,
    },
  },
});
