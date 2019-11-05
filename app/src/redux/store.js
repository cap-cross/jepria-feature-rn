import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import feature from './feature/featureReducer';
import operators from './operator/operatorReducer';
import statuses from './status/statusReducer';
import user from './user/userReducer';
import history from './process/featureProcessReducer';

export default createStore(combineReducers({
  feature,
  operators,
  statuses,
  user,
  history,
  form,
}), applyMiddleware(thunk));