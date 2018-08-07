import * as actions from './statusActions.js';

export default function statuses(state = [], action) {
    const { type, payload } = action;
    switch (type) {        
        case actions.FETCH_STATUSES_BEGIN: return payload.isLoading;

        case actions.FETCH_STATUSES_FAILURE: {
            return {
                isFailed: payload.isFailed,
                errorMessage: payload.errorMessage
            }
        }
        case actions.FETCH_STATUSES_SUCCESS: return payload.statuses;
        default: return state;
    }
}