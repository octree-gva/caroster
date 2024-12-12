import {Box, Paper, useMediaQuery} from '@mui/material';
import SearchField from './SearchField';
import {useTheme} from '@mui/styles';

type Props = {};

const MapActions = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      zIndex={400}
      position="relative"
      top={isMobile ? 120 : 100}
      left={25}
      right={25}
    >
      <Box component={Paper} p={1} maxWidth={`calc(100vw - 50px)`} width={350}>
        <SearchField />
      </Box>
    </Box>
  );
};

export default MapActions;
