import create from 'zustand';
import {UsersPermissionsUser} from '../generated/graphql';

type State = {
  token: string | null;
  setToken: (token?: string) => void;
  user: Omit<UsersPermissionsUser, 'created_at' | 'updated_at' | '__typename'> | null;
  setUser: (
    user?: Omit<UsersPermissionsUser, 'created_at' | 'updated_at' | '__typename'>
  ) => void;
  logout: () => void;
};

const hasStorage = typeof localStorage !== 'undefined';

const useAuthStore = create<State>((set, get) => ({
  token: hasStorage ? localStorage.getItem('token') : null,
  setToken: (token: string) => {
    if (hasStorage) localStorage.setItem('token', token);
    set({token});
  },
  user:
    hasStorage &&
    localStorage.getItem('user') &&
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  setUser: user => {
    if (hasStorage) localStorage.setItem('user', JSON.stringify(user));
    set({user});
  },
  logout: () => {
    set({token: null, user: null});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  },
}));

export default useAuthStore;
