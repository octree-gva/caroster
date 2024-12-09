import {PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const MapWrapper = ({children}: PropsWithChildren) => {
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <ThemeProvider theme={theme}>
      <Box
        id="map"
        width="100%"
        height={mobile ? '60vh' : '50vh'}
        sx={{position: 'relative'}}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MapWrapper;
