import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import {useTranslation} from 'react-i18next';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import SignInForm from '../../containers/SignInForm';
import LanguagesIcon from '../../containers/Languages/Icon';
import {getSession} from 'next-auth/react';
import pageUtils from '../../lib/pageUtils';
import Typography from '@mui/material/Typography';
import theme from '../../theme';

interface PageProps {
  error?: string;
  emailConfirmation?: boolean;
}

const Login = (props: PageProps) => {
  const {emailConfirmation} = props;
  const {t} = useTranslation();

  return (
    <Layout menuTitle={t('signin.title')} displayMenu={false}>
      <Card>
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
