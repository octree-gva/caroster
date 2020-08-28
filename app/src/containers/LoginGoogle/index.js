import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ReactComponent as GoogleIcon} from '../../assets/google-icon.svg';
const LoginGoogle = () => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <CardContent className={classes.content}>
      <Button
        variant="outlined"
        color="primary"
        href="/connect/google"
        startIcon={<GoogleIcon className={classes.googleIcon} />}
      >
        {t('signin.withGoogle')}
      </Button>
    </CardContent>
  );
};

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
  },
  googleIcon: {
    height: 32,
    width: 32,
  },
}));

export default LoginGoogle;
