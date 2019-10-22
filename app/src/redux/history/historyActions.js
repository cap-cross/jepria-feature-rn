export const FETCH_HISTORY_BEGIN = 'FETCH_HISTORY_BEGIN';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export function fetchHistory(isLoading) {
    console.log("FETCH FeatureHistory BEGIN " + isLoading);

    return {
        type: FETCH_HISTORY_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchHistorySuccess(history) {
    console.log("FETCH FeatureHistory SUCCESS " + JSON.stringify(history));

    return {
        type: FETCH_HISTORY_SUCCESS,
        payload : {
            history,
        }
    }
}


export function fetchHistoryFailure(isFailed, errorMessage) {
    console.log("FETCH FeatureHistory FAILURE " + isFailed + " " + errorMessage);

    return {
        type: FETCH_HISTORY_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

