import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import {useTheme} from '@mui/material/styles';

interface Props {
  icon: string;
  title: string;
  onClick: () => void;
  active: boolean;
}

const DrawerMenuItem = ({icon, title, onClick, active}: Props) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        display: 'flex',
        padding: theme.spacing(2),
        position: 'relative',
        minWidth: 0,
        margin: 0,
        width: '100%',
        justifyContent: 'flex-start',
        color: '#242424',

        [theme.breakpoints.down('md')]: {
          margin: '0 auto',
          width: '100%',
          height: '80px',
          flexDirection: 'column',
        },
      }}
      onClick={onClick}
    >
      <Chip
        sx={{
          pt: 0.5,
          backgroundColor: active ? 'primary.light' : 'transparent',
          display: 'inline-block',
          width: theme.spacing(6),
          height: theme.spacing(4),
          justifyContent: 'middle',
        }}
        label={
          <Icon
            color="action"
            className={active ? 'material-icons' : 'material-icons-outlined'}
          >
            {icon}
          </Icon>
        }
      />
      <Typography
        color="inherit"
        sx={{
          ml: 1,
          position: 'relative',
          fontSize: '11px',
          lineHeight: '1.1em',
          height: 'auto',
          display: 'inline-block',
          textTransform: 'none',

          [theme.breakpoints.down('md')]: {
            whiteSpace: 'nowrap',
            lineHeight: '.5em',
            ml: 0,
            mt: 1.5,
          },
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default DrawerMenuItem;
