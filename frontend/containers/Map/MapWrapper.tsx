import {PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../theme';

const MapWrapper = ({children}: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <Box id="map" sx={{width: '100%', height: '50vh'}}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default MapWrapper;
