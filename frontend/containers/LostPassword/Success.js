import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';

const Success = ({email}) => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Card className={classes.successCard}>
      <CardContent>
        <Icon size="large" color="primary" className={classes.successIcon}>
          done
        </Icon>
      </CardContent>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {t('lost_password.sent', {email})}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Link href="/auth/login" passHref>
          <Button id="LostPasswordRegister" color="primary" variant="contained">
            {t('lost_password.actions.login')}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  successCard: {
    textAlign: 'center',
  },
  successIcon: {
    fontSize: theme.spacing(14),
  },
  actions: {
    justifyContent: 'center',
  },
}));
export default Success;
