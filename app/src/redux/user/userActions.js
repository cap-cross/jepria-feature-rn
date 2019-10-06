export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export function fetchUser(isLoading) {
    console.log("FETCH featureUser BEGIN " + isLoading);

    return {
        type: FETCH_USER_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchUserSuccess(user) {
    console.log("FETCH featureUser SUCCESS " + JSON.stringify(user));

    return {
        type: FETCH_USER_SUCCESS,
        payload : {
            user,
        }
    }
}


export function fetchUserFailure(isFailed, errorMessage) {
    console.log("FETCH featureUser FAILURE " + isFailed + " " + errorMessage);

    return {
        type: FETCH_USER_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

export function loginUser(isAuthentificating) {
    console.log("LOGIN featureUser BEGIN " + isAuthentificating);

    return {
        type: LOGIN_USER_BEGIN,
        payload : {
            isAuthentificating,
        }
    }
}

export function loginUserSuccess() {
    console.log("LOGIN featureUser SUCCESS");

    return {
        type: LOGIN_USER_SUCCESS
    }
}


export function loginUserFailure(isFailed, errorMessage) {
    console.log("LOGIN featureUser FAILURE " + isFailed + " " + errorMessage);

    return {
        type: LOGIN_USER_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

export function logout() {
    console.log("LOGOUT COMPLETED");

    return {
        type: USER_LOGOUT,
    }
}
