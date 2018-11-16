import {SecureStore} from 'expo';
import log from '@cap-cross/cap-core';
import {BASE_URL, FEATURE_SERVICE_CONTEXT} from '../../apiConfig';
import fetchJSON from '../../fetchJSON';
import * as Errors from '../../errors';

const LOGIN_API_URL = `${BASE_URL}/${FEATURE_SERVICE_CONTEXT}/LoginServlet?`;

const shouldAuthenticate = error => {
  return error.errorCode === Errors.AUTHENTICATION_ERROR || error.errorCode === Errors.ACCESS_DENIED;
}

const processLogin = (username, password) => {
  log.info("loginAPI(Cookies): Processing authentication...");
  return fetch(LOGIN_API_URL + 'username=' + username + '&password=' + password,
  {
    method: 'POST',
    credentials: 'include'
  })
  .then((response) => {
    if (response.ok) {
      log.info("loginAPI(Cookies): Authentication completed...");
      saveCredentials(username, password);
      return response;
    } else {
      if(response.status === 401) throw new Errors.APIError("Неверные данные", Errors.AUTHENTICATION_ERROR);
      else throw new Error("Network connection problem");
    }
  })
  .catch((error) => {
    log.info("loginAPI(Cookies): Authentication failed: " + error.message);
    throw error;
  })
};

const getCredentials = () => {
  return new Promise(async (resolve, reject) => {
    log.info("loginAPI(Cookies): Resolving credentials...")
    let username, password;
    username = await SecureStore.getItemAsync("username");
    password = await SecureStore.getItemAsync("password");
    pin = await SecureStore.getItemAsync("pin");
    hasFingerPrint = await SecureStore.getItemAsync("hasFingerPrint");
    if (username === null || password === null) {
      log.info("loginAPI(Cookies): Failed to resolve credential...")
      reject(new Errors.APIError("No credentials found", Errors.NO_CREDENTIALS_ERROR));
    } else {
      log.info("loginAPI(Cookies): Credentials resolved...")
      resolve({username, password, pin, hasFingerPrint});
    }
  });
}

const saveCredentials = async (username, password) => {
  try {
    log.info("loginAPI(Cookies): Saving credentials...");
    await SecureStore.setItemAsync("username", username);
    await SecureStore.setItemAsync("password", password);
  } catch (error) {
    log.info("loginAPI(Cookies): Error occured while saving credentials: " + error.message);
  }
}

const getCredentialedFetch = async function () {
  return (input, init) => fetchJSON(input, init);
}

const authenticate = () => {
  log.info("loginAPI(Cookies): Authenticating...")
  return getCredentials()
  .then(async (credentials) => {
    await processLogin(credentials.username, credentials.password)
    .then((response) => {
      log.info("loginAPI(Cookies): Authentication completed");
      return response;
    })
    .catch((error) => {
      log.info("loginAPI(Cookies): Authentication failed, redirect to Auth process");
      throw error;
    });
  })
  .catch((error) => {
    log.info("loginAPI(Cookies): Authentication failed, redirect to Auth process");
    throw error;
  });
}

export const loginAPI = {
  credentialedFetchPromise: getCredentialedFetch(),
  shouldAuthenticate,
  authenticate,
  getCredentials,
  processLogin
};
