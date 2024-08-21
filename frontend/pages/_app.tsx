import {useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import '../public/leaflet_reset.css';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, Theme} from '@mui/material/styles';
import {AppProps} from 'next/app';
import {appWithTranslation} from 'next-i18next';
import {ApolloProvider} from '@apollo/client';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {SessionProvider} from 'next-auth/react';
import Metas from '../containers/Metas';
import Toasts from '../components/Toasts';
import theme from '../theme';
import useLocale from '../hooks/useLocale';
import {useApollo} from '../lib/apolloClient';
import nextI18NextConfig from '../next-i18next.config.js';
import moment from 'moment';
import useTolgee from '../hooks/useTolgee';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const App = function (props: AppProps) {
  const {Component, pageProps} = props;
  const apolloClient = useApollo(pageProps);
  const {locale} = useLocale();
  useTolgee();

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
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          dateLibInstance={moment}
          adapterLocale={locale}
        >
          <CssBaseline />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            />
          </Head>
          <Component {...pageProps} />
          <Toasts />
        </LocalizationProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const AppWrapper = (props: AppProps) => (
  <SessionProvider session={props?.pageProps.session} basePath="/api/nauth">
    <App {...props} />
  </SessionProvider>
);

export default appWithTranslation(AppWrapper, nextI18NextConfig);
