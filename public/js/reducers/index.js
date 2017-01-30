import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cvs from './cvs';
import auth from './auth';

export default combineReducers({
  cvs,
  auth,
  form: formReducer
});
