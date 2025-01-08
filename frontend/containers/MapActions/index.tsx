import {Box, Paper, useMediaQuery} from '@mui/material';
import SearchField from './SearchField';
import {useTheme} from '@mui/styles';

type Props = {};

const MapActions = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      id="map-actions"
      zIndex={400}
      position="absolute"
      top={isMobile ? 95 : 64}
      left={isMobile ? 0 : 25}
      right={isMobile ? 0 : 25}
    >
      <Box component={Paper} p={1} width={isMobile ? '100%' : 350}>
        <SearchField />
      </Box>
    </Box>
  );
};

export default MapActions;
