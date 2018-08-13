
import log from '@cap-cross/cap-core';
export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

export function fetchUser(isLoading) {
    log.trace("FETCH featureUser BEGIN " + isLoading);

    return {
        type: FETCH_USER_BEGIN,
        payload : {
            isLoading,
        }
    }
}

export function fetchUserSuccess(user) {
    log.trace("FETCH featureUser SUCCESS " + JSON.stringify(user));

    return {
        type: FETCH_USER_SUCCESS,
        payload : {
            user,
        }
    }
}


export function fetchUserFailure(isFailed, errorMessage) {
    log.trace("FETCH featureUser FAILURE " + isFailed + " " + errorMessage);

    return {
        type: FETCH_USER_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

export function loginUser(isAuthentificating) {
    log.trace("LOGIN featureUser BEGIN " + isAuthentificating);

    return {
        type: LOGIN_USER_BEGIN,
        payload : {
            isAuthentificating,
        }
    }
}

export function loginUserSuccess(user) {
    log.trace("LOGIN featureUser SUCCESS");

    return {
        type: LOGIN_USER_SUCCESS
    }
}


export function loginUserFailure(isFailed, errorMessage) {
    log.trace("LOGIN featureUser FAILURE " + isFailed + " " + errorMessage);

    return {
        type: LOGIN_USER_FAILURE,
        payload : {
            isFailed,
            errorMessage,
        }
    }
}

export function logout() {
    log.trace("LOGOUT COMPLETED");

    return {
        type: USER_LOGOUT,
    }
}
