import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS
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
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
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
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default auth;
