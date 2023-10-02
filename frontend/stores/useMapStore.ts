import {type LatLngExpression} from 'leaflet';
import { CircleMarkerProps } from 'react-leaflet';
import {create} from 'zustand';

type State = {
  preventUpdateKey: string;
  center: LatLngExpression;
  markers: Array<CircleMarkerProps>;
  setPreventUpdateKey: (preventUpdateKey: string) => void;
  setCenter: (center: LatLngExpression) => void;
  setMarkers: (markers: Array<CircleMarkerProps>) => void;
};

const useMapStore = create<State>((set, get) => ({
  preventUpdateKey: '',
  center: [0, 0],
  markers: [],
  setPreventUpdateKey: preventUpdateKey => set({preventUpdateKey}),
  setCenter: center => set({center}),
  setMarkers: markers => {
    set({markers});
  },
}));

export default useMapStore;
