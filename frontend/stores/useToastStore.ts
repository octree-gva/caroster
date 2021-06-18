import create from 'zustand';

type State = {
  toast?: string;
  addToast: (message: string) => void;
  clearToast: () => void;
};

const useToastStore = create<State>(set => ({
  toast: null,
  addToast: toast => set({toast}),
  clearToast: () => set({toast: null}),
}));

export default useToastStore;
