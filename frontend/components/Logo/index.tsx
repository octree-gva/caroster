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
        src={'/assets/Caroster_beta.png'}
        alt="Caroster"
        sx={{
          display: 'block',
          width: '55%',
          height: 'auto',
          margin: '0 auto',
        }}
      />
    </Box>
  );
};

export default Logo;
