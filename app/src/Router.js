import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import useGTM from './hooks/useGTM';

// Pages
import Home from './pages/Home';
import Event from './pages/Event';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
const Router = () => {
  useGTM();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/e/:eventId" component={Event} />
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
