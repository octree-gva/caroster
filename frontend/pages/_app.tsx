import {useEffect} from 'react';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {useApollo} from '../lib/apolloClient';
import {Enum_Userspermissionsuser_Lang} from '../generated/graphql';
import useLangStore from '../stores/useLangStore';
import Languages from '../containers/Languages';
import Metas from '../containers/Metas';
import Toasts from '../components/Toasts';
import theme from '../theme';
import 'moment/locale/fr-ch';
import '../i18n';

moment.locale('fr-ch');

const App = function (props: AppProps) {
  const {Component, pageProps} = props;
  const apolloClient = useApollo(pageProps);
  const language = useLangStore(s => s.language);

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
          locale={
            language === Enum_Userspermissionsuser_Lang.Fr ? 'fr-ch' : 'en'
          }
        >
          <CssBaseline />
          <Component {...pageProps} />
          <Toasts />
          <Languages />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
