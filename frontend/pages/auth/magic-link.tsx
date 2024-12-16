import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const MagicLinkLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const {token} = router.query;
    if (token)
      signIn('credentials', {
        token,
        callbackUrl: '/dashboard',
      });
  }, [router]);

  return null;
};

export default MagicLinkLogin;
