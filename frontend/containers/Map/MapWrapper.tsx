import {PropsWithChildren} from 'react';
import {Box} from '@mui/material';

const MapWrapper = ({children}: PropsWithChildren) => {
  return <Box sx={{width: '100%', height: '50vh'}}>{children}</Box>;
};

export default MapWrapper;
