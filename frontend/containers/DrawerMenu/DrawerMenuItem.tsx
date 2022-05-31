import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

interface Props {
  Icon: JSX.Element;
  title: string;
  onClick: () => void;
  active: boolean;
}

const DrawerMenuItem = ({Icon, title, onClick, active}: Props) => {
  const classes = useStyles({active});
  return (
    <Box className={classes.drawerMenuItem}>
      <Button className={classes.button} color="inherit" onClick={onClick}>
        {Icon}
      </Button>
      <Typography
        color="inherit"
        className={classes.drawerText}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default DrawerMenuItem;
