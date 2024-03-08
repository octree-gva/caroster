import {getSession} from 'next-auth/react';

const IndexPage = () => null;

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  else
    return {
      redirect: {
        destination: '/new',
        permanent: false,
      },
    };
};

export default IndexPage;
