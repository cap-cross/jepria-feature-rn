export const FETCH_STATUSES_BEGIN = 'FETCH_STATUSES_BEGIN';
export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const FETCH_STATUSES_FAILURE = 'FETCH_STATUSES_FAILURE';

export function fetchStatuses(isLoading) {
    console.log("FETCH featureStatuses BEGIN");

    return {
        type: FETCH_STATUSES_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchStatusesSuccess(statuses) {
    console.log("FETCH featureStatuses SUCCESS");

    return {
        type: FETCH_STATUSES_SUCCESS,
        payload : {
            statuses,
        }
    }
}


export function fetchStatusesFailure(isFailed, errorMessage) {
    console.log("FETCH featureStatuses FAILURE" + errorMessage);

    return {
        type: FETCH_STATUSES_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

