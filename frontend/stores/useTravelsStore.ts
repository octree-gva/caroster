import {Moment} from 'moment';
import {create} from 'zustand';

interface Meeting {
  place: string;
  latitude?: number;
  longitude?: number;
}

interface State {
  datesFilter: Moment[];
  setDatesFilter: (dates: Moment[]) => void;

  meetingFilter: Meeting;
  setMeetingFilter: (meeting: Meeting) => void;
}

const useTravelsStore = create<State>((set, get) => ({
  datesFilter: [],
  setDatesFilter: datesFilter => set({datesFilter}),

  meetingFilter: {place: ''},
  setMeetingFilter: meetingFilter => set({meetingFilter}),
}));

export default useTravelsStore;
