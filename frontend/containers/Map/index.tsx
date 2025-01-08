import {CircularProgress} from '@mui/material';
import dynamic from 'next/dynamic';
import MapWrapper from './MapWrapper';

const ClientMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <MapWrapper>
      <CircularProgress
        sx={{position: 'absolute', margin: '0 auto', top: '50%'}}
      />
    </MapWrapper>
  ),
});

export default ClientMap;
