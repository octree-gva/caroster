import React, {Component} from 'react';
import LogoutAndRedirect from './LogoutAndRedirect';
import {ApiProblem} from 'strapi-react-context';
import {Redirect} from 'react-router-dom';

/**
 * Error boundary to catch all the error from our code.
 * If the error catched is an `unauthorized` APIProblem, will logout and redirect. Otherwise
 * will redirect to an /error page. (nicer than blank page)
 */
class ErrorBoundary extends Component {
  state = {error: null};

  /**
   * @param {Error} error
   * @return {Object} new state after derivation
   */
  static getDerivedStateFromError(error) {
    if (error instanceof ApiProblem) {
      return {error: error.kind};
    }
    return {error: 'unknown'};
  }

  /**
   * Component did catch an error, log it.
   * @param {Error} error
   */
  componentDidCatch(error) {
    console.error('App did catch an error', {error});
  }

  /**
   * @override
   */
  render() {
    if (this.state.error === null) return this.props.children;

    if (this.state.error === 'unauthorized') return <LogoutAndRedirect />;
    return <Redirect to="error" />;
  }
}
export default ErrorBoundary;
