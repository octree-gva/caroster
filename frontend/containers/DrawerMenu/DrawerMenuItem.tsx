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
    <Button className={classes.drawerMenuButton} onClick={onClick}>
      <Box className={classes.icon} color="inherit">
        {Icon}
      </Box>
      <Typography color="inherit" className={classes.drawerText}>
        {title}
      </Typography>
    </Button>
  );
};

export default DrawerMenuItem;
