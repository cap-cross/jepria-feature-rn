import * as actions from './statusActions.js';
import {getStatuses} from '../../api/FeatureAPI';

export const getFeatureStatuses = () => {
    return (dispatch) => {
        dispatch(actions.fetchStatuses(true));
        try {
            getStatuses()
                .then((response) => {
                    dispatch(actions.fetchStatusesSuccess(response));
                });
        } catch (error) {
            dispatch(actions.fetchStatusesFailure(true, error.message));
        }
    };
}