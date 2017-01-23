import { combineReducers } from 'redux';
import cvs from './cvs';
import filter from './filter';

export default combineReducers({
  cvs,
  filter
});
