import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import Error404 from './components/Error404';
import Root from './containers/Root';
import Home from './containers/VisibleCvList';
import Auth from './components/Auth';
import Profile from './containers/ProfileForm';
import CvForm from './containers/CvForm';
import store from './store';

function isLoggedIn(nextState, replace, callback) {
  const state = store.getState();
  if (!state.auth.signedIn) {
    replace('login');
  }
  callback();
}

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} onEnter={isLoggedIn} />
    <Route path="login" component={Auth} />
    <Route path="profile" component={Profile} onEnter={isLoggedIn} />
    <Route path="cv" component={CvForm} onEnter={isLoggedIn} />
    <Route path="cv/:cvId" component={CvForm} onEnter={isLoggedIn} />
    <Route path="*" component={Error404} />
  </Route>
);

const RouterComponent = props =>
  <Router history={props.history} routes={routes} />;

RouterComponent.propTypes = {
  history: React.PropTypes.object.isRequired
};

export default RouterComponent;
