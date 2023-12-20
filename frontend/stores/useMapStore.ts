import {ReactNode} from 'react';
import {type LatLngExpression, LatLngBoundsExpression} from 'leaflet';
import {create} from 'zustand';
import {Travel} from '../generated/graphql';

type State = {
  map?: any;
  preventUpdateKey: string;
  markers: Array<ReactNode>;
  focusedTravel?: string;
  bounds: Array<LatLngExpression>;
  setMap: (map: any) => void;
  setPreventUpdateKey: (preventUpdateKey: string) => void;
  setMarkers: (markers: Array<ReactNode>) => void;
  setFocusOnTravel: (travel?: Travel & {id: string}) => void;
  setBounds: (bounds: Array<LatLngExpression>) => void;
};

const useMapStore = create<State>((set, get) => ({
  map: undefined,
  preventUpdateKey: '',
  markers: [],
  focusedTravel: undefined,
  bounds: [],
  setMap: map => set({map}),
  setPreventUpdateKey: preventUpdateKey => set({preventUpdateKey}),
  setMarkers: markers => set({markers}),
  setFocusOnTravel: travel => {
    if (!travel) {
      set({focusedTravel: undefined});
    } else {
      set({focusedTravel: travel.id});
      const lat = travel.meeting_latitude;
      const long = travel.meeting_longitude;
      if (lat && long) get().map?.panTo([lat, long]);
    }
  },
  setBounds: bounds => {
    set({bounds});
  },
}));

export default useMapStore;
