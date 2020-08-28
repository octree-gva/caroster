import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './i18n';
import 'moment/locale/fr-ch';
import * as serviceWorker from './serviceWorker';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  // Require to not be embed in production builds
  const axe = require('react-axe');
  const {config} = require('./setupA11y');
  // Throws some accessibility warning on rendered DOM.
  // @see https://github.com/dequelabs/react-axe
  axe(React, ReactDOM, 1000, config);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
