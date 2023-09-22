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
        padding: theme.spacing(0, 4, 0, 2),
        position: 'relative',
        minWidth: 0,
        margin: 0,
        width: '100%',
        justifyContent: 'flex-start',
        height: '84px',
        color: '#242424',

        [theme.breakpoints.down('md')]: {
          margin: '0 auto',
          height: '56px',
          width: '100%',
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
        label={<Icon color="action">{icon}</Icon>}
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
          },
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default DrawerMenuItem;
