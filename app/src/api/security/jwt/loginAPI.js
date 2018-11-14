import merge from 'lodash/merge';
import {BASE_URL} from '../../apiConfig';
import {SecureStore} from 'expo';
import log from '@cap-cross/cap-core';
import fetchJSON from '../../fetchJSON';
import * as Errors from '../../errors';

const AUTH_URL = `${BASE_URL}/auth/jwt/login?`
const REFRESH_URL = `${BASE_URL}/auth/jwt/refresh`

const shouldAuthenticate = error => {
  return error.errorCode === Errors.AUTHENTICATION_ERROR || error.errorCode === Errors.ACCESS_DENIED;
}

const processLogin = (username, password) => {
  log.info("loginAPI: Processing authentication...");
  return fetch(AUTH_URL + 'username=' + username + '&password=' + password,
  {
    method: 'POST',
    credentials: 'include'
  })
  .then((response) => {
    if (response.ok) {
      log.info("loginAPI: Authentication completed...");
      response.json().then(function(tokens) {
        saveTokens(tokens.accessToken, tokens.refreshToken);
        return response;
      });
    } else {
      if(response.status === 401) throw new Errors.APIError("Неверные данные", Errors.AUTHENTICATION_ERROR);
      else throw new Error("Network connection problem");
    }
  })
  .catch((error) => {
    log.error("loginAPI: Authentication failed: " + error.message);
    throw error;
  })
};

const getCredentials = () => {
  return new Promise(async (resolve, reject) => {
    log.info("loginAPI.getCredentials(): Resolving credentials...");
    try {
      let tokens = await getTokens(); 
      pin = await SecureStore.getItemAsync("pin");
      hasFingerPrint = await SecureStore.getItemAsync("hasFingerPrint");
      log.info("loginAPI: Credentials resolved...")
      resolve({...tokens, pin, hasFingerPrint});
    } catch (error) {
      log.error("loginAPI: Failed to resolve credentials...")
      reject(error);
    }
  });
}

const getTokens = async () => {
  log.info("loginAPI: Resolving tokens...");
  let accessToken, refreshToken;
  accessToken = await SecureStore.getItemAsync("accessToken");
  refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (accessToken === null || refreshToken === null) {
    log.error("loginAPI: Failed to resolve tokens...")
    throw new Errors.APIError("No tokens found", Errors.NO_CREDENTIALS_ERROR);
  } else {
    log.info("loginAPI: Tokens resolved...")
    return({accessToken, refreshToken});
  }
}

const saveTokens = async (accessToken, refreshToken) => {
  try {
    log.trace("loginAPI: Saving tokens...");
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error) {
    log.error("loginAPI: Error occured while saving tokens: " + error.message);
  }
}

const refreshTokens = (refreshToken) => {
  log.info("loginAPI: Refreshing tokens...");
  return fetch(REFRESH_URL,
  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Authorization': 'Bearer ' + refreshToken
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if(response.status === 401) throw new Errors.APIError("Пользовательская сессия истекла, войдите в приложение заново", Errors.AUTHENTICATION_ERROR);
      else throw new Error("Network connection problem");
    }
  })
  .then((tokens) => {
    log.trace("loginAPI: Saving new tokens... ");
    saveTokens(tokens.accessToken, tokens.refreshToken);
    return tokens;
  })
  .catch((error) => {
    log.error("loginAPI: Refreshing tokens failed: " + error.message);
    throw error;
  })
};

const getCredentialedFetch = async function (tokenPromise) {
  const tokens = await tokenPromise;
  const result = function (input, init) {
    const initAccessToken = merge(
      {
        headers: {
          'Authorization': 'Bearer ' + tokens.accessToken,
        },
      },
      init,
    );
    return fetchJSON(input, initAccessToken);
  };
  return result;
}
 
const authenticate = () => {
  log.info("Authenticating...")
  return getTokens()
  .then(async (tokens) => {
    try {
      return getCredentialedFetch(refreshTokens(tokens.refreshToken));
  } catch(e) {
      log.error("Authentication failed, redirect to Auth process");
      throw error;
    }
  })
  .catch((error) => {
    log.error("Authentication failed, redirect to Auth process");
    throw error;
  });
}

export const loginAPI = {
  credentialedFetchPromise: getCredentialedFetch(getTokens()),
  shouldAuthenticate,
  authenticate,
  getCredentials,
  processLogin
};