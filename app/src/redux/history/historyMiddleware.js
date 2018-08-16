import * as actions from './historyActions.js';
import {taskHistory} from '../../api/FeatureAPI';

export const findHistory = (task) => {
    return (dispatch) => {
        dispatch(actions.fetchHistory(true));
        try {
          taskHistory.findTaskHistory(task.id)
                .then((response) => {
                    dispatch(actions.fetchHistorySuccess(response));
                });
        } catch (error) {
            dispatch(actions.fetchHistoryFailure(true, error.message));
        }
    };
}