import * as actions from './operatorActions.js';
import {operators} from '../../api/FeatureAPI';

export const getOperators = () => {
    return (dispatch) => {
        dispatch(actions.fetchOperators(true));
        try {
            operators.getOperators()
                .then((response) => {
                    dispatch(actions.fetchOperatorsSuccess(response.body));
                });
        } catch (error) {
            dispatch(actions.fetchOperatorsFailure(true, error.message));
        }
    };
}