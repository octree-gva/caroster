import React from 'react';
import Layout from '../layouts/Centered';
import Logo from '../components/Logo';
import CreateEvent from '../containers/CreateEvent';

const Home = () => {
  return (
    <Layout>
      <Logo />
      <CreateEvent />
    </Layout>
  );
};

export default Home;
