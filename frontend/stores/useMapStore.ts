import {ReactNode} from 'react';
import type {LatLngExpression, Map as LMap} from 'leaflet';
import {create} from 'zustand';
import {TravelEntity} from '../generated/graphql';

type State = {
  map?: LMap;
  markers: Array<ReactNode>;
  focusedTravel?: string;
  bounds: Array<LatLngExpression>;
  setMap: (map: LMap) => void;
  setMarkers: (markers: Array<ReactNode>) => void;
  setFocusOnTravel: (travel?: TravelEntity) => void;
  setBounds: (bounds: Array<LatLngExpression>) => void;
};

const useMapStore = create<State>((set, get) => ({
  map: undefined,
  markers: [],
  focusedTravel: undefined,
  bounds: [],
  setMap: map => set({map}),
  setMarkers: markers => set({markers}),
  setFocusOnTravel: travel => {
    const currentFocusId = get().focusedTravel;
    if (!travel || travel.id === currentFocusId)
      set({focusedTravel: undefined});
    else {
      set({focusedTravel: travel.id});
      const lat = travel.attributes?.meeting_latitude;
      const long = travel.attributes?.meeting_longitude;
      if (lat && long) get().map?.panTo([lat, long]);
    }
  },
  setBounds: bounds => {
    set({bounds});
  },
}));

export default useMapStore;
