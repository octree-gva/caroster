import {Box, Paper} from '@mui/material';
import SearchField from './SearchField';

type Props = {};

const MapActions = (props: Props) => {
  return (
    <Box component={Paper} p={1} maxWidth={350}>
      <SearchField />
    </Box>
  );
};

export default MapActions;
