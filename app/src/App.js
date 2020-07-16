import React from 'react';
import {StrapiProvider} from 'strapi-react-context';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {ToastProvider} from './contexts/Toast';
import Router from './Router';
import theme from './theme';

const models = [
  {name: 'events'},
  {name: 'cars'},
  {name: 'pages'},
  {name: 'users'},
  {name: 'settings', singleType: true, init: true},
];

const App = () => {
  return (
    <StrapiProvider models={models}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ToastProvider>
            <CssBaseline />
            <Router />
          </ToastProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StrapiProvider>
  );
};

export default App;
