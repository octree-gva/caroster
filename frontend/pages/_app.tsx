import {useEffect} from 'react';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {SessionProvider} from 'next-auth/react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {useApollo} from '../lib/apolloClient';
import Metas from '../containers/Metas';
import Toasts from '../components/Toasts';
import theme from '../theme';
import {useTranslation} from 'react-i18next';
import useProfile from '../hooks/useProfile';
import {changeLang} from '../lib/i18n';

const App = function (props: AppProps) {
  const {Component, pageProps} = props;
  const apolloClient = useApollo(pageProps);
  const {profile} = useProfile();
  const {i18n} = useTranslation();

  useEffect(() => {
    if (profile?.lang) changeLang(profile.lang);
  }, [profile]);

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
        <MuiPickersUtilsProvider
          libInstance={moment}
          utils={MomentUtils}
          locale={i18n.language === 'fr' ? 'fr-ch' : 'en'}
        >
          <CssBaseline />
          <Component {...pageProps} />
          <Toasts />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const AppWrapper = (props: AppProps) => (
  <SessionProvider session={props?.pageProps.session} basePath="/api/nauth">
    <App {...props} />
  </SessionProvider>
);

export default AppWrapper;
