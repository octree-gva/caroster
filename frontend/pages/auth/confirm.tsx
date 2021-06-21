import Layout from '../../layouts/Centered';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../../components/Logo';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActions';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const Confirm = () => {
  const {t} = useTranslation();

  return (
    <Layout>
      <Card>
        <CardMedia component={Logo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {t('confirm.title')}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {t('confirm.text')}
          </Typography>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              href={'/auth/login'}
              id="SignUpSuccessLogin"
            >
              {t('confirm.login')}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Layout>
  );
};

export default Confirm;
