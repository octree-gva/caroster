import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import LogoUrl from '../../assets/logo.png';

const Logo = () => {
  const classes = useStyles();
  return <img src={LogoUrl} alt="Caroster" className={classes.logo} />;
};

const useStyles = makeStyles(theme => ({
  logo: {
    width: '100%',
  },
}));
export default Logo;
