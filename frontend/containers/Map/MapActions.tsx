import {Box, Paper} from '@mui/material';
import SearchField from './SearchField';

type Props = {};

const MapActions = (props: Props) => {
  return (
    <Box zIndex={400} position="relative" top={75} left={25} right={25}>
      <Box component={Paper} p={1} maxWidth={`calc(100vw - 50px)`} width={350}>
        <SearchField />
      </Box>
    </Box>
  );
};

export default MapActions;
