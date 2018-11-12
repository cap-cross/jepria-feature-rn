
import log from '@cap-cross/cap-core';
export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const AUTH_USER_BEGIN = 'AUTH_USER_BEGIN';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';
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
    log.trace("FETCH featureUser SUCCESS " + user.operatorId + '/' + user.userName);

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

export function loginUser(isAuthenticating) {
    log.trace("LOGIN featureUser BEGIN " + isAuthenticating);

    return {
        type: LOGIN_USER_BEGIN,
        payload : {
            isAuthenticating,
        }
    }
}

export function loginUserSuccess() {
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

export function authenticateUser(isAuthenticating) {
    log.trace("AUTH featureUser BEGIN " + isAuthenticating);

    return {
        type: AUTH_USER_BEGIN,
        payload : {
            isAuthenticating,
        }
    }
}

export function authenticateUserSuccess() {
    log.trace("AUTH featureUser SUCCESS");

    return {
        type: AUTH_USER_SUCCESS
    }
}


export function authenticateUserFailure(isFailed, errorMessage) {
    log.trace("AUTH featureUser FAILURE " + isFailed + " " + errorMessage);

    return {
        type: AUTH_USER_FAILURE,
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
