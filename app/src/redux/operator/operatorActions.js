export const FETCH_OPERATORS_BEGIN = 'FETCH_OPERATORS_BEGIN';
export const FETCH_OPERATORS_SUCCESS = 'FETCH_OPERATORS_SUCCESS';
export const FETCH_OPERATORS_FAILURE = 'FETCH_OPERATORS_FAILURE';

export function fetchOperators(isLoading) {
    console.log("FETCH featureOperators BEGIN");

    return {
        type: FETCH_OPERATORS_BEGIN,
        payload : {
            isLoading
        }
    }
}

export function fetchOperatorsSuccess(operators) {
    console.log("FETCH featureOperators SUCCESS");

    return {
        type: FETCH_OPERATORS_SUCCESS,
        payload : {
            operators
        }
    }
}


export function fetchOperatorsFailure(isFailed, errorMessage) {
    console.log("FETCH featureOperators FAILURE " + errorMessage);

    return {
        type: FETCH_OPERATORS_FAILURE,
        payload : {
            isFailed,
            errorMessage
        }
    }
}

