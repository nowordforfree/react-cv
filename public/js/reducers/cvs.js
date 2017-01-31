import {
  CV_FETCH,
  CV_RECEIVED,
  CV_FAILURE,
  CV_ADD,
  CV_SHOW,
  CV_SEARCH,
  CV_SEARCH_RESET
} from '../actions';

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
    case CV_ADD:
      return {
        ...state,
        items: [...state.items, ...action.data ]
      };
    case CV_SEARCH:
      return {
        ...state,
        filter: action.filter
      };
    case CV_SEARCH_RESET:
      return {
        ...state,
        filter: initialState.filter
      };
    case CV_FETCH:
      return {
        ...state,
        isFetching: true
      };
    case CV_RECEIVED:
      return {
        ...state,
        isFetching: false,
        items: [...action.data]
      };
    case CV_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default cvs;
