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
import SignIn from './pages/SignIn';
import LostPassword from './pages/LostPassword.js';
import ResetPassword from './pages/ResetPassword.js';

const Router = () => {
  useGTM();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/e/:eventId" component={Event} />
        <Route path="/" exact component={Home} />
        <Route path="/new" exact component={Home} />
        <Route path="/register" exact component={SignUp} />
        <Route path="/lost-password" exact component={LostPassword} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/profile" exact component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
