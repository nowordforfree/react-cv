import { ACTION_TYPES } from '../actions';

const initialState = {
  signedIn: false,
  user: null,
  isFetching: false,
  error: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
    case ACTION_TYPES.LOGOUT_REQUEST:
    case ACTION_TYPES.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      localStorage.setItem('token', action.data.token);
    case ACTION_TYPES.PROFILE_UPDATE_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.data.user || action.data));
      return {
        ...state,
        user: action.data.user,
        signedIn: true,
        isFetching: false
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        signedIn: false,
        isFetching: false,
        error: action.error
      };
    case ACTION_TYPES.LOGOUT_FAILURE:
    case ACTION_TYPES.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return initialState;
    default:
      return state;
  }
};

export default auth;
