import * as actions from './historyActions.js';
import {FeatureHistory} from '../../api/FeatureAPI';

export const findHistory = (task) => {
    return (dispatch) => {
        dispatch(actions.fetchHistory(true));
        try {
          FeatureHistory.findFeatureHistory(task.id)
                .then((response) => {
                    dispatch(actions.fetchHistorySuccess(response));
                });
        } catch (error) {
            dispatch(actions.fetchHistoryFailure(true, error.message));
        }
    };
}