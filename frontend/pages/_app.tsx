import {useEffect, Fragment} from 'react';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import {ApolloProvider} from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useApollo} from '../lib/apolloClient';
import theme from '../theme';
import Toasts from '../components/Toasts';
import 'moment/locale/fr-ch';
import '../i18n';
import Metas from '../containers/Metas';

const App = function (props: AppProps) {
  const {Component, pageProps} = props;
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Metas metas={pageProps.metas} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Toasts />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
