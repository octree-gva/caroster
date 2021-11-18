import create from 'zustand';
import {persist} from 'zustand/middleware';
import {Enum_Userspermissionsuser_Lang} from '../generated/graphql';

const STORAGE_KEY = 'caroster-lang';

type State = {
  language: Enum_Userspermissionsuser_Lang;
  setLanguage: (language?: Enum_Userspermissionsuser_Lang) => void;
};

const useLangStore = create<State>(
  persist(
    set => ({
      language: Enum_Userspermissionsuser_Lang.Fr,
      setLanguage: language => set({language}),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useLangStore;
