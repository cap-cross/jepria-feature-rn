import * as actions from './operatorActions.js';
import {getOperators} from '../../api/FeatureAPI';

export const getFeatureOperators = () => {
    return (dispatch) => {
        dispatch(actions.fetchOperators(true));
        try {
            getOperators()
                .then((response) => {
                    dispatch(actions.fetchOperatorsSuccess(response));
                });
        } catch (error) {
            dispatch(actions.fetchOperatorsFailure(true, error.message));
        }
    };
}