import {PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const MapWrapper = ({children}: PropsWithChildren) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <ThemeProvider theme={theme}>
      <Box
        id="map"
        width="100%"
        height={isMobile ? '60vh' : '50vh'}
        pt={isMobile ? 12 : 0}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MapWrapper;
