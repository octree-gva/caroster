import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LoginGoogle = () => {
  const {t} = useTranslation();
  const classes = useStyles();

  return (
    <CardContent className={classes.content}>
      <Button variant="contained" color="primary" href="/connect/google">
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
}));

export default LoginGoogle;
