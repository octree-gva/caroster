import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface Props {
  Icon: JSX.Element;
  title: string;
  onClick: () => void;
  active: boolean;
}

const DrawerMenuItem = ({Icon, title, onClick, active}: Props) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        display: 'block',
        position: 'relative',
        minWidth: 0,
        margin: 0,
        width: '84px',
        height: '84px',
        textAlign: 'center',
        color: active
          ? theme.palette.background.default
          : 'rgba(256, 256, 256, .76)',

        [theme.breakpoints.down('md')]: {
          margin: '0 auto',
          height: '56px',
          width: '100%',
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'block',
          width: '100%',
          padding: 0,
        }}
        color="inherit"
      >
        {Icon}
      </Box>
      <Typography
        color="inherit"
        sx={{
          position: 'relative',
          fontSize: '11px',
          lineHeight: '1.1em',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
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
