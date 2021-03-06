import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './Login';
import AuthService from '../../utils/AuthService';
const auth = new AuthService('', '');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

import App from './App';
import LandingPage from '../../pages/LandingPage/LandingPage'
import Dashboard from '../../pages/Dashboard/Dashboard';


export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={Dashboard} onEnter={requireAuth} />
    <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="/dashboard/:jobid" component={Dashboard} />
    <Route path="/dashboard/:jobid/:noteid" component={Dashboard} />
    {/*<Route path="about" component={AboutPage} />*/}
  </Route>
);
