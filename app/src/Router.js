import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import useGTM from './hooks/useGTM';

// Pages
import Home from './pages/Home';
import Event from './pages/Event';
import NotFound from './pages/NotFound';

const Router = () => {
  useGTM();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/e/:eventId" component={Event} />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
