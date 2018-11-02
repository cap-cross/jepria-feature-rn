import {BASE_URL, FEATURE_SERVICE_CONTEXT} from './apiConfig';
import {SecureStore} from 'expo';
import log from '@cap-cross/cap-core';
import fetchJSON from './fetchJSON';
import configureJepFetch from './configureJepFetch';
import * as Errors from './errors';

const AUTH_URL = `${BASE_URL}/auth/jwt/login?`
const REFRESH_URL = `${BASE_URL}/auth/jwt/refresh`

const shouldAuthenticate = error => {
  return error.errorCode === Errors.AUTHENTICATION_ERROR || error.errorCode === Errors.ACCESS_DENIED;
}

export const processLogin = (username, password) => {
  log.trace("LoginAPI: Processing authentication...");
  return fetch(AUTH_URL + 'username=' + username + '&password=' + password,
  {
    method: 'POST',
    credentials: 'include'
  })
  .then((response) => {
    if (response.ok) {
      log.trace("LoginAPI: Authentication completed...");
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
    log.trace("LoginAPI: Authentication failed: " + error.message);
    throw error;
  })
};

export const getCredentials = () => {
  log.trace("LoginAPI.getCredentials()");
  return new Promise(async (resolve, reject) => {
    log.trace("LoginAPI.getCredentials(): Resolving credentials...");
    try {
      let tokens = await getTokens(); 
      log.trace("LoginAPI.getCredentials(): tokens = " + JSON.stringify(tokens));
      pin = await SecureStore.getItemAsync("pin");
      hasFingerPrint = await SecureStore.getItemAsync("hasFingerPrint");
      log.trace("LoginAPI: Credentials resolved...")
      resolve({...tokens, pin, hasFingerPrint});
    } catch (error) {
      log.trace("LoginAPI: Failed to resolve credentials...")
      reject(error);
    }
  });
}

const getTokens = async () => {
  log.trace("LoginAPI: Resolving tokens...");
  let accessToken, refreshToken;
  accessToken = await SecureStore.getItemAsync("accessToken");
  refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (accessToken === null || refreshToken === null) {
    log.trace("LoginAPI: Failed to resolve tokens...")
    throw new Errors.APIError("No tokens found", Errors.NO_CREDENTIALS_ERROR);
  } else {
    log.trace("LoginAPI: Tokens resolved...")
    return({accessToken, refreshToken});
  }
}

const saveTokens = async (accessToken, refreshToken) => {
  try {
    log.trace("LoginAPI: Saving tokens...");
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error) {
    log.trace("LoginAPI: Error occured while saving tokens: " + error.message);
  }
}

const refreshTokens = (refreshToken) => {
  log.trace("LoginAPI: Refreshing tokens...");
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
    log.trace("LoginAPI: Saving new tokens... " + JSON.stringify(tokens));
    saveTokens(tokens.accessToken, tokens.refreshToken);
    return tokens;
  })
  .catch((error) => {
    log.trace("LoginAPI: Refreshing tokens failed: " + error.message);
    throw error;
  })
};

const getFetch = async function (tokenPromise) {
  let tokens = await tokenPromise;
  log.trace("getFetch(): tokens = " + JSON.stringify(tokens));
  log.trace("getFetch(): accessToken = " + tokens.accessToken);
  return function (input, init) {
    log.trace('getFetch() accessToken = ' + accessToken);
    const initAccessToken = merge(
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      },
      init,
    );
    return fetchJSON(input, initAccessToken);
  }
}
 
export const authenticate = () => {
  log.trace("LoginAPI.authenticate(): Authenticating...")
  return getTokens()
  .then(async (tokens) => {
    // return refreshTokens(tokens.refreshToken)
    //   .then((newTokens) => {
    //     log.trace("LoginAPI: Authentication completed New tokens = " + JSON.stringify(newTokens));
    //     newSecureFetch = getFetch(newTokens.accessToken);
    //     log.trace("LoginAPI: newSecureFetch = " + newSecureFetch);
    //     return newSecureFetch;
    //   })
    //   .catch((error) => {
    //     log.trace("LoginAPI: Authentication failed, redirect to Auth process");
    //     throw error;
    //   });
    try {
      newSecureFetch = await getFetch(refreshTokens(tokens.refreshToken));
      log.trace("LoginAPI.authenticate(): newSecureFetch = " + newSecureFetch);
      return newSecureFetch;
  } catch(e) {
      log.trace("LoginAPI.authenticate(): Authentication failed, redirect to Auth process");
      throw error;
    }
  })
  .catch((error) => {
    log.trace("LoginAPI.authenticate(): Authentication failed, redirect to Auth process");
    throw error;
  });
}

// const secureFetch = () => {
//   return getFetch(getTokens());
// }

export const jepFetch = configureJepFetch({
  secureFetch: getFetch(getTokens()),
  shouldAuthenticate,
  authenticate
});