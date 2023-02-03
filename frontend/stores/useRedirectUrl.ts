import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type State = {
  redirectUrl: string | null;
  setRedirectUrl: (redirectUrl: string) => void;
  getRedirectUrl: () => string;
};

const useRedirectUrlStore = create<State>()(
  persist(
    (set, get) => ({
      redirectUrl: null,
      setRedirectUrl: redirectUrl => set({redirectUrl}),
      getRedirectUrl: () => {
        const redirectUrl = get().redirectUrl;
        set({redirectUrl: null});
        return redirectUrl;
      },
    }),
    {
      name: 'REDIRECT_URL_STORE',
    }
  )
);

export default useRedirectUrlStore;
