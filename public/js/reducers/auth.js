import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE
} from '../actions';

const initialState = {
  signedIn: false,
  user: null,
  isFetching: false,
  error: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.data.token);
    case PROFILE_UPDATE_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.data.user || action.data));
      return {
        ...state,
        user: action.data.user,
        signedIn: true,
        isFetching: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        signedIn: false,
        isFetching: false,
        error: action.error
      };
    case LOGOUT_FAILURE:
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return initialState;
    default:
      return state;
  }
};

export default auth;
