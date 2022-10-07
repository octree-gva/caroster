import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {useTranslation} from 'react-i18next';
import Layout from '../../../layouts/Centered';
import Logo from '../../../components/Logo';
import LanguagesIcon from '../../../containers/Languages/Icon';
import CardContent from '@material-ui/core/CardContent';
import SignUpActions from '../../../containers/MailSignUpForm/SignupActions';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import LoginGoogle from '../../../containers/LoginGoogle';
import Link from 'next/link';
import Markdown from '../../../components/Markdown';

const MailSignup = () => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Layout menuTitle={t('signup.title')} displayMenu={false}>
      <Card>
        <CardMedia component={Logo} />
        <CardContent className={classes.content}>
          <Typography variant="overline" component="h5" align="center">
            {t('signup.create')}
          </Typography>
          <Box className={classes.content}>
            <Link href="/auth/register/mail" passHref>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                className={classes.button}
              >
                {t('signup.with_mail')}
              </Button>
            </Link>
            <LoginGoogle />
          </Box>
          <Box className={classes.divider}>
            <Markdown
              className={classes.conditions}
              variant="overline"
              align="center"
            >
              {t('signup.conditions')}
            </Markdown>

            <Divider />
          </Box>
          <Typography align="center" variant="body2">
            {t('signup.account_already')}
          </Typography>
        </CardContent>
        <SignUpActions />
        <LanguagesIcon />
      </Card>
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(0, 6),
  },
  button: {
    margin: theme.spacing(8, 1, 4, 1),
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 2, 0),
  },
  conditions: {
    '& a': {
      color: 'inherit',
    },
  },
}));

export default MailSignup;
