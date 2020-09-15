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
import ErrorBoundary from './containers/ErrorBoundary';
const Router = () => {
  useGTM();
  return (
    <BrowserRouter>
      <ErrorBoundary>
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
          <Route path="/error" exact component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Router;
