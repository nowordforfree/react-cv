import { combineReducers } from 'redux';
import cvs from './cvs';
import filter from './filter';
import auth from './auth';

export default combineReducers({
  cvs,
  filter,
  auth
});
