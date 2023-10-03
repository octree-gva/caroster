import {useTheme} from '@mui/material/styles';
import {Box} from '@mui/material';

const Logo = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
      }}
    >
      <Box
        component="img"
        src={'/assets/logo.svg'}
        alt="Caroster"
        sx={{
          display: 'block',
          width: '68px',
          height: 'auto',
          margin: '0 auto',
        }}
      />
    </Box>
  );
};

export default Logo;
