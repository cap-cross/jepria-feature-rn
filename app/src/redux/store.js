import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import feature from './feature/featureReducer';
import operators from './operator/operatorReducer';
import statuses from './status/statusReducer';
import history from './process/featureProcessReducer';

export default createStore(combineReducers({
  feature,
  operators,
  statuses,
  history,
  form,
}), applyMiddleware(thunk));