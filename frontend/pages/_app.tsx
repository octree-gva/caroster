import {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, Theme} from '@mui/material/styles';
import {AppProps} from 'next/app';
import {I18nextProvider} from 'react-i18next';
import {ApolloProvider} from '@apollo/client';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {SessionProvider} from 'next-auth/react';
import moment from 'moment';
import Metas from '../containers/Metas';
import Toasts from '../components/Toasts';
import theme from '../theme';
import useLocale from '../hooks/useLocale';
import i18n, {initI18Next} from '../lib/i18n';
import {useApollo} from '../lib/apolloClient';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App = function (props: AppProps) {
  const {Component, pageProps} = props;
  const apolloClient = useApollo(pageProps);
  const {locale} = useLocale();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  initI18Next(locale);

  return (
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={apolloClient}>
        <Metas metas={pageProps.metas} />
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            dateLibInstance={moment}
            adapterLocale={locale === 'fr' ? 'fr-ch' : 'en'}
          >
            <CssBaseline />
            <Component {...pageProps} />
            <Toasts />
          </LocalizationProvider>
        </ThemeProvider>
      </ApolloProvider>
    </I18nextProvider>
  );
};

const AppWrapper = (props: AppProps) => (
  <SessionProvider session={props?.pageProps.session} basePath="/api/nauth">
    <App {...props} />
  </SessionProvider>
);

export default AppWrapper;
