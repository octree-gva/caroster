import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import {useTranslation} from 'next-i18next';
import Layout from '../../layouts/Centered';
import Logo from '../../components/Logo';
import NextLink from 'next/link';
import pageUtils from '../../lib/pageUtils';
import {getSession} from 'next-auth/react';

const EmailConfirmation = () => {
  const {t} = useTranslation();

  return (
    <Layout displayMenu={false}>
      <Container maxWidth="xs">
        <Card sx={{pt: 2, width: '100%'}}>
          <CardMedia component={Logo} />
          <Typography sx={{p: 2}} variant="body2" align="center">
            {t(`emailConfirmation.invalidMessage`)}
          </Typography>
          <CardActions
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              mb: 2,
              px: 2,
            }}
          >
            <NextLink href="/auth/login" passHref>
              <Button size="small">{t('emailConfirmation.toLogin')}</Button>
            </NextLink>
          </CardActions>
        </Card>
      </Container>
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
  else return pageUtils.getServerSideProps()(context);
};

export default EmailConfirmation;
