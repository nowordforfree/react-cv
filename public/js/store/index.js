import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from '../reducers';

const getPreloadedAuthState = () => {
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  if (user) {
    try {
      user = JSON.parse(user);
    } catch (err) {
      user = null;
    }
  }
  return {
    auth: {
      signedIn: !!(token && user),
      user: user
    }
  };
}

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middlewares.push(logger);
}

export default createStore(
  reducer,
  getPreloadedAuthState(),
  applyMiddleware(...middlewares)
);