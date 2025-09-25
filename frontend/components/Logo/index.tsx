import {Box} from '@mui/material';
import theme from '../../theme';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
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
