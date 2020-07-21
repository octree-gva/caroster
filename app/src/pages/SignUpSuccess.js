import React from 'react';
import Layout from '../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../components/Logo';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {useAuth} from 'strapi-react-context';
import {Redirect} from 'react-router-dom';

const SignUpSuccess = () => {
  const {t} = useTranslation();
  const {token} = useAuth();

  if (!token) return <Redirect to="/" />;

  return (
    <Layout>
      <Card>
        <CardMedia component={Logo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {t('signup.success.title')}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            dangerouslySetInnerHTML={{__html: t('signup.success.text_html')}}
          />
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            href={'/'}
            id="SignUpSuccessCreateEvent"
          >
            {t('signup.success.create_event')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            href={'/dashboard'}
            id="SignUpSuccessDashboard"
          >
            {t('signup.success.dashboard')}
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
};

export default SignUpSuccess;
