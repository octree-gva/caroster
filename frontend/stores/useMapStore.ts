import {ReactNode} from 'react';
import {type LatLngExpression} from 'leaflet';
import {CircleMarkerProps} from 'react-leaflet';
import {create} from 'zustand';
import {Travel} from '../generated/graphql';

type State = {
  map?: any;
  preventUpdateKey: string;
  center: LatLngExpression;
  markers: Array<CircleMarkerProps & {popup: ReactNode}>;
  focusedTravel?: string;
  setMap: (map: any) => void;
  setPreventUpdateKey: (preventUpdateKey: string) => void;
  setCenter: (center: LatLngExpression) => void;
  setMarkers: (markers: Array<CircleMarkerProps>) => void;
  setFocusOnTravel: (travel: Travel & {id: string}) => void;
};

const useMapStore = create<State>((set, get) => ({
  map: undefined,
  preventUpdateKey: '',
  center: [0, 0],
  markers: [],
  focusedTravel: undefined,
  setMap: map => set({map}),
  setPreventUpdateKey: preventUpdateKey => set({preventUpdateKey}),
  setCenter: center => set({center}),
  setMarkers: markers => set({markers}),
  setFocusOnTravel: travel => {
    set({focusedTravel: travel.id});
    const lat = travel.meeting_latitude;
    const long = travel.meeting_longitude;
    if (lat && long) get().map?.flyTo([lat, long], 16);
  },
}));

export default useMapStore;
