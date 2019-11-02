import {combineReducers} from 'redux/lib/redux';
import { reducer as form } from 'redux-form';
import feature from './feature/featureReducer';
import navigate from './navigate/reducer';
import operators from './operator/operatorReducer';
import statuses from './status/statusReducer';
import user from './user/userReducer';
import history from './process/featureProcessReducer';

export default combineReducers({
  feature,
  navigate,
  form,
  operators,
  statuses,
  user,
  history,
});
