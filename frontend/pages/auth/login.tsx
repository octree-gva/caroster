import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import {getSession} from 'next-auth/react';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import SignInForm from '../../containers/SignInForm';
import LanguagesIcon from '../../containers/Languages/Icon';
import pageUtils from '../../lib/pageUtils';
import Container from '@mui/material/Container';

interface PageProps {
  error?: string;
  emailConfirmation?: boolean;
}

const Login = (props: PageProps) => {
  const {emailConfirmation} = props;
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Container maxWidth="xs">
        <Card sx={{pt: 2, width: '100%'}}>
          <CardMedia component={Logo} />
          {emailConfirmation && (
            <Typography
              sx={{marginBottom: theme.spacing(2)}}
              variant="body2"
              align="center"
            >{t`signin.emailConfirmation`}</Typography>
          )}
          <SignInForm error={props?.error} />
        </Card>
      </Container>
      <LanguagesIcon />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  else
    return pageUtils.getServerSideProps(async ctx => {
      const error = ctx.query?.error || null;
      const emailConfirmation = ctx.query?.confirmed === 'true';
      return {props: {error, emailConfirmation}};
    })(context);
};

export default Login;
