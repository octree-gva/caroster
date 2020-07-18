import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import useGTM from './hooks/useGTM';

// Pages
import Home from './pages/Home';
import Event from './pages/Event';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignUpSuccess from './pages/SignUpSuccess';
import NotConfirmed from './pages/SignUpSuccess';
import SignIn from './pages/SignIn';

const Router = () => {
  useGTM();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/e/:eventId" component={Event} />
        <Route path="/" exact component={Home} />
        <Route path="/new" exact component={Home} />
        <Route path="/register/success" exact component={SignUpSuccess} />
        <Route path="/register" exact component={SignUp} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/confirm" exact component={NotConfirmed} />
        <Route path="/profile" exact component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
