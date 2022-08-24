import useAuthStore from '../stores/useAuthStore';
import {useLoginMutation} from '../generated/graphql';

const useLoginForm = (identifier: string, password: string) => {
  const setToken = useAuthStore(s => s.setToken);
  const setUser = useAuthStore(s => s.setUser);
  const [sendCreds, {loading}] = useLoginMutation();

  const login = async () => {
    const {data} = await sendCreds({
      variables: {
        identifier,
        password,
      },
    });
    const token = data?.login?.jwt;
    if (token) {
      setToken(token);
      setUser(data?.login?.user);
    } else throw new Error('no_token');
  };

  return {login, loading};
};

export default useLoginForm;
