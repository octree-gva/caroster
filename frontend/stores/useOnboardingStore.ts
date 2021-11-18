import create from 'zustand';
import {persist} from 'zustand/middleware';

const STORAGE_KEY = 'caroster-onboarding';

type State = {
  onboardingUser: boolean;
  onboardingCreator: boolean;
  setOnboarding: (onboarding: any) => void;
};

const useOnboardingStore = create<State>(
  persist(
    set => ({
      onboardingUser: false,
      onboardingCreator: false,
      setOnboarding: onboarding => set(s => ({...s, ...onboarding})),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useOnboardingStore;
