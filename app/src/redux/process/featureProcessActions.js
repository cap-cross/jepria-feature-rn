export const FETCH_PROCESS_BEGIN = 'FETCH_PROCESS_BEGIN';
export const FETCH_PROCESS_SUCCESS = 'FETCH_PROCESS_SUCCESS';
export const FETCH_PROCESS_FAILURE = 'FETCH_PROCESS_FAILURE';

export function fetchFeatureProcess(isLoading) {
    console.log("FETCH FeatureProcess BEGIN " + isLoading);

    return {
        type: FETCH_PROCESS_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchFeatureProcessSuccess(history) {
    console.log("FETCH FeatureProcess SUCCESS " + JSON.stringify(history));

    return {
        type: FETCH_PROCESS_SUCCESS,
        payload : {
            history,
        }
    }
}


export function fetchFeatureProcessFailure(isFailed, errorMessage) {
    console.log("FETCH FeatureProcess FAILURE " + isFailed + " " + errorMessage);

    return {
        type: FETCH_PROCESS_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

