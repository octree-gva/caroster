import React from 'react';
import Layout from '../layouts/Centered';
import Paper from '../components/Paper';
import Logo from '../components/Logo';
import CreateEvent from '../containers/CreateEvent';

const Home = () => {
  return (
    <Layout>
      <Paper>
        <Logo />
        <CreateEvent />
      </Paper>
    </Layout>
  );
};

export default Home;
