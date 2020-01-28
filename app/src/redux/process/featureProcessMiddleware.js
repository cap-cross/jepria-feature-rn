import * as actions from './featureProcessActions.js';
import {findProcess} from '../../api/FeatureAPI';

export const findFeatureProcess = (feature) => {
    return (dispatch) => {
        dispatch(actions.fetchFeatureProcess(true));
        findProcess(feature.featureId)
            .then((response) => {
                dispatch(actions.fetchFeatureProcessSuccess(response));
            })
            .catch((error) => {
                dispatch(actions.fetchFeatureProcessFailure(true, error.message));
            })
    };
}