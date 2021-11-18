import create from 'zustand';

type State = {
  showWelcome: boolean;
  isCreator: boolean | null;
  run: boolean;
  step: number;
  prev: number;
  setTour: (tour: any) => void;
};

const useTourStore = create<State>(set => ({
  showWelcome: false,
  isCreator: null,
  run: false,
  step: -1,
  prev: -1,
  setTour: tour => set(s => ({...s, ...tour})),
}));

export default useTourStore;
