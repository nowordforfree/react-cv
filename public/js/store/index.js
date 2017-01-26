import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const getPreloadedAuthState = () => {
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  if (user) {
      user = JSON.parse(user);
  }
  return {
    auth: {
      signedIn: !!(token && user),
      user: user
    }
  };
}

export default createStore(
  reducer,
  getPreloadedAuthState(),
  applyMiddleware(thunk)
);