import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from 'strapi-react-context';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const SignUpSuccess = () => {
  const {t} = useTranslation();
  const {token} = useAuth();
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Layout>
      <Card>
        <CardMedia component={Logo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {t('signup.success.title')}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {t('signup.success.text')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            href={'/login'}
            id="SignUpSuccessLogin"
          >
            {t('signup.success.login')}
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
};

export default SignUpSuccess;
