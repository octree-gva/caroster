import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import theme from '../../theme';

const LoginGoogle = () => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth
      href="/api/connect/google"
    >
      <img
        className={classes.googleLogo}
        height="25px"
        src="/assets/google-icon.svg"
        alt="Google Login"
      />
      {t('signin.withGoogle')}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  googleLogo: {
    marginRight: theme.spacing(1)
  }
}));

export default LoginGoogle;
