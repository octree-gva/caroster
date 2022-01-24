import create from 'zustand';

type Tour = {
  showWelcome: boolean;
  isCreator: boolean | null;
  run: boolean;
  step: number;
  prev: number;
}

type State = Tour & {
  setTour: (tour: Partial<Tour>) => void;
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
