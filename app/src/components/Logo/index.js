import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import LogoUrl from '../../assets/logo.png';

const LOGO_URL = 'https://caroster.io';

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <a href={LOGO_URL} className={classes.link}>
        <img src={LogoUrl} alt="Caroster" className={classes.logo} />
      </a>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  link: {
    width: '60%',
  },
  logo: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
}));
export default Logo;
