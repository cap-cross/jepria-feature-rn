import combineReducers from 'redux/lib/combineReducers';
import { reducer as form } from 'redux-form';
import tasks from './tasks/taskReducer';
import navigate from './navigate/reducer';
import operators from './operator/operatorReducer';
import statuses from './status/statusReducer';
import user from './user/userReducer';
import history from './history/historyReducer';

export default combineReducers({
  tasks,
  navigate,
  form,
  operators,
  statuses,
  user,
  history,
});
