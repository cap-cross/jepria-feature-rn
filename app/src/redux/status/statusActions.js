
import log from '@cap-cross/cap-core';
export const FETCH_STATUSES_BEGIN = 'FETCH_STATUSES_BEGIN';
export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const FETCH_STATUSES_FAILURE = 'FETCH_STATUSES_FAILURE';

export function fetchStatuses(isLoading) {
    log.trace("FETCH featureStatuses BEGIN " + isLoading);

    return {
        type: FETCH_STATUSES_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchStatusesSuccess(statuses) {
    log.trace("FETCH featureStatuses SUCCESS " + JSON.stringify(statuses));

    return {
        type: FETCH_STATUSES_SUCCESS,
        payload : {
            statuses,
        }
    }
}


export function fetchStatusesFailure(isFailed, errorMessage) {
    log.trace("FETCH featureStatuses FAILURE " + isFailed + " " + errorMessage);

    return {
        type: FETCH_STATUSES_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

