import { ACTION_TYPES } from '../actions';

const initialState = {
  items: [],
  isFetching: false,
  filter: {
    type: 'SHOW_ALL',
    text: ''
  },
  error: null
};

const cvs = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CV_SEARCH:
      return {
        ...state,
        filter: action.filter
      };
    case ACTION_TYPES.CV_SEARCH_RESET:
      return {
        ...state,
        filter: initialState.filter
      };
    case ACTION_TYPES.CV_ADD:
    case ACTION_TYPES.CV_DELETE:
    case ACTION_TYPES.CV_FETCH:
    case ACTION_TYPES.CV_UPDATE:
      return {
        ...state,
        isFetching: true
      };
    case ACTION_TYPES.CV_ADD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.data]
      };
    case ACTION_TYPES.CV_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.filter(obj => !action.data.includes(obj.id))
      };
    case ACTION_TYPES.CV_UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: state.items.map((obj) => {
          if (obj.id === action.data.id) {
            return action.data;
          }
          return obj;
        })
      };
    case ACTION_TYPES.CV_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...action.data]
      };
    case ACTION_TYPES.CV_ADD_FAILURE:
    case ACTION_TYPES.CV_DELETE_FAILURE:
    case ACTION_TYPES.CV_FETCH_FAILURE:
    case ACTION_TYPES.CV_UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case ACTION_TYPES.SESSION_EXPIRED:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default cvs;
