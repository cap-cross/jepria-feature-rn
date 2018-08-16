import * as actions from './statusActions.js';
import {statuses} from '../../api/FeatureAPI';

export const getStatuses = () => {
    return (dispatch) => {
        dispatch(actions.fetchStatuses(true));
        try {
            statuses.getStatuses()
                .then((response) => {
                    dispatch(actions.fetchStatusesSuccess(response));
                });
        } catch (error) {
            dispatch(actions.fetchStatusesFailure(true, error.message));
        }
    };
}