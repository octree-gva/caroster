import create from 'zustand';
import {persist} from 'zustand/middleware';

const STORAGE_KEY = 'caroster-onboarding';

type OnBoarding = {onboardingUser: boolean; onboardingCreator: boolean};

type State = OnBoarding & {
  setOnboarding: (onboarding: Partial<OnBoarding>) => void;
};

const useOnboardingStore = create<State>()(
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
