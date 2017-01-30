import {
  CV_FETCH,
  CV_RECEIVED,
  CV_FAILURE,
  CV_ADD,
  CV_SHOW
} from '../actions';

const initialState = {
  items: [],
  isFetching: false,
  filter: 'SHOW_ALL',
  error: null
};

const cvs = (state = initialState, action) => {
  switch (action.type) {
    case CV_ADD:
      return {
        ...state,
        items: [...state.items, ...action.data ]
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
