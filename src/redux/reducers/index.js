import { combineReducers } from 'redux';
import user from './user';
import loading from './loading';
import error from './error';
import analysis from './analysis'

import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  user,
  loading,
  error,
  "analysisReducer": analysis,
  toastr: toastrReducer,
  form: formReducer
});

