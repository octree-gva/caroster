import Link from 'next/link';
import {makeStyles} from '@material-ui/core/styles';
import useProfile from '../../hooks/useProfile';
import useSettings from '../../hooks/useSettings';

const Logo = () => {
  const classes = useStyles();
  const {connected} = useProfile();
  const settings = useSettings();
  const appLink = connected ? '/dashboard' : settings?.['about_link'] || '';
  return (
    <div className={classes.layout}>
      <Link href={appLink} className={classes.link}>
        <img
          src={'/assets/Caroster_beta.png'}
          alt="Caroster"
          className={classes.logo}
        />
      </Link>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  link: {
    width: '100%',
  },
  logo: {
    display: 'block',
    width: '55%',
    height: 'auto',
    margin: '0 auto',
  },
}));
export default Logo;
