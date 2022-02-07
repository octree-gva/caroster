import {makeStyles} from '@material-ui/core/styles';

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <a href="https://caroster.io" className={classes.link}>
        <img src={'/assets/Caroster_beta.png'} alt="Caroster" className={classes.logo} />
      </a>
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
