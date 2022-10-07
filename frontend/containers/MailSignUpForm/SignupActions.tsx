import Link from 'next/link';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';

const SignUpActions = () => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <CardActions className={classes.actions}>
      <Link href="/auth/login" passHref>
        <Button id="SignUpLogin" variant="text">
          {t('signup.login')}
        </Button>
      </Link>
    </CardActions>
  );
};

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));

export default SignUpActions;
