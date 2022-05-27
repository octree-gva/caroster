import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

interface Props {
  Icon: JSX.Element;
  title: string;
  href: string;
}

const DrawerMenuItem = ({Icon, title, href}: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.drawerMenuItem}>
      <Button className={classes.button} color="primary" variant='contained' href={href}>
        {Icon}
      </Button>
      <Typography
        variant="overline"
        color="inherit"
        className={classes.drawerText}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default DrawerMenuItem;
