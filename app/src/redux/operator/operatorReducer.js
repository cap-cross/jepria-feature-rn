import * as actions from './operatorActions.js';

export default function operators(state = [], action) {
    const { type, payload } = action;
    switch (type) {        
        case actions.FETCH_OPERATORS_BEGIN: return payload.isLoading;

        case actions.FETCH_OPERATORS_FAILURE: {
            return {
                isFailed: payload.isFailed,
                errorMessage: payload.errorMessage
            }
        }
        case actions.FETCH_OPERATORS_SUCCESS: return payload.operators;
        default: return state;
    }
}