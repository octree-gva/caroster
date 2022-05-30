import {ReactNode} from 'react';
import create from 'zustand';

type State = {
  toast?: string;
  action?: ReactNode;
  addToast: (message: string, action?: ReactNode) => void;
  clearToast: () => void;
};

const useToastStore = create<State>(set => ({
  toast: null,
  action: null,
  addToast: (toast, action = null) => set({toast, action}),
  clearToast: () => set({toast: null, action: null}),
}));

export default useToastStore;
