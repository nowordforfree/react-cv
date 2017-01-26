import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import Error404 from './components/Error404';
import Root from './components/Root';
import Home from './components/Home';
import Login from './components/Login';
import store from './store';

function isLoggedIn(nextState, replace, callback) {
  const state = store.getState();
  if (!state.auth.signedIn) {
    replace('login');
  }
  callback();
}

const routes =
  <Route path='/' component={Root}>
    <IndexRoute component={Home} onEnter={isLoggedIn}/>
    <Route path='login' component={Login}/>
    <Route path='*' component={Error404}/>
  </Route>;

export default (props) => {
  return <Router history={props.history} routes={routes} />;
};
