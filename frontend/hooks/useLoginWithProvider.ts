const useLoginWithProvider = () => {
  const setToken = () => {}; // DEV
  const setUser = () => {}; // DEV

  const loginWithProvider = async (provider: string, search: string) => {
    const resultRaw = await fetch(`/api/auth/${provider}/callback${search}`);
    const result = await resultRaw.json();
    if (result.hasOwnProperty('error')) throw result;
    setToken(result.jwt);
    setUser(result.user);
    return result;
  };

  return {loginWithProvider};
};

export default useLoginWithProvider;
