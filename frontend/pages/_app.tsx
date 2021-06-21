import {useEffect, Fragment} from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import {ApolloProvider} from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useApollo} from '../lib/apolloClient';
import theme from '../theme';
import Toasts from '../components/Toasts';
import 'moment/locale/fr-ch';
import '../i18n';

const App = function (props: AppProps) {
  const {Component, pageProps} = props;
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    // Remove the server-side injected CSS (MUI).
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Fragment>
        <Head>
          <title>Caroster</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Toasts />
        </ThemeProvider>
      </Fragment>
    </ApolloProvider>
  );
};

export default App;
