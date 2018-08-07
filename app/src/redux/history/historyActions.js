
import log from '@cap-cross/cap-core';
export const FETCH_HISTORY_BEGIN = 'FETCH_HISTORY_BEGIN';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export function fetchHistory(isLoading) {
    log.trace("FETCH taskHistory BEGIN " + isLoading);

    return {
        type: FETCH_HISTORY_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchHistorySuccess(history) {
    log.trace("FETCH taskHistory SUCCESS " + JSON.stringify(history));

    return {
        type: FETCH_HISTORY_SUCCESS,
        payload : {
            history,
        }
    }
}


export function fetchHistoryFailure(isFailed, errorMessage) {
    log.trace("FETCH taskHistory FAILURE " + isFailed + " " + errorMessage);

    return {
        type: FETCH_HISTORY_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

