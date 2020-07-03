import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import LogoUrl from '../../assets/logo.png';

const LOGO_URL = 'https://caroster.io';

const Logo = () => {
  const classes = useStyles();
  return (
    <a href={LOGO_URL}>
      <img src={LogoUrl} alt="Caroster" className={classes.logo} />
    </a>
  );
};

const useStyles = makeStyles(theme => ({
  logo: {
    width: '100%',
  },
}));
export default Logo;
