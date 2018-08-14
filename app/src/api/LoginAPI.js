import {BASE_URL, FEATURE_SERVICE_CONTEXT} from './apiConfig';
import {SecureStore} from 'expo';
import log from '@cap-cross/cap-core';
import fetchJSON from './fetchJSON'; // from 'jep-fetch'
import configureJepFetch from './configureJepFetch';
import * as Errors from './errors';

const LOGIN_API_URL = `${BASE_URL}/${FEATURE_SERVICE_CONTEXT}/LoginServlet?`;

const SSO_CONTEXT_PART = 'SsoUi'; // Может быть также SsoUi_XX

const shouldAuthenticate = error => isAuthorizationError(error);

const isAuthorizationError = error => error.message.indexOf(SSO_CONTEXT_PART) > -1;

export const isSsoLoginRequest = (response) => {
  log.trace(`loginApiImpl.isSsoLoginRequest(): response.status = ${response.status}`);
  log.trace(`loginApiImpl.isSsoLoginRequest(): response.url = ${response.url}`);

  const result = response.status === 200 && response.url.indexOf(SSO_CONTEXT_PART) > -1;
  log.trace(`loginApiImpl.isSsoLoginRequest() = ${result}`);
  return result;
};

export const processLogin = (username, password) => {
  log.trace("Processing authentification...");
  return fetch(LOGIN_API_URL + 'username=' + username + '&password=' + password)
  .then((response) => {
    if (response.ok) {
      log.trace("Authentification completed...");
      saveCredentials(username, password);
      return response;
    } else {
      if(response.status === 401) throw new Errors.APIError("Неверные данные", Errors.AUTHENTIFICATION_ERROR);
      else throw new Error("Network connection problem");
    }
  })
  .catch((error) => {
    log.trace("Authentification failed: " + error.message);
    throw error;
  })
};

const getCredentials = () => {
  return new Promise(async (resolve, reject) => {
    log.trace("Resolving credentials...")
    let username, password;
    username = await SecureStore.getItemAsync("username");
    password = await SecureStore.getItemAsync("password");
    if (username === null || password === null) {
      log.trace("Failed to resolve credential...")
      reject(new Errors.APIError("No credentials found", Errors.NO_CREDENTIALS_ERROR));
    } else {
      log.trace("Credentials resolved...")
      resolve({username, password});
    }
  });
}

const saveCredentials = async (username, password) => {
  try {
    log.trace("Saving credentials...");
    await SecureStore.setItemAsync("username", username);
    await SecureStore.setItemAsync("password", password);
  } catch (error) {
    log.trace("Error occured while saving credentials: " + error.message);
  }
}

export const authentificate = () => {
  log.trace("Authentificating...")
  return getCredentials()
  .then((credentials) => {
    processLogin(credentials.username, credentials.password)
    .then((response) => {
      log.trace("Authentification completed, returning to previous request");
      return response;
    })
    .catch((error) => {
      log.trace("Authentification failed, redirect to Auth process");
      throw error;
    });
  })
  .catch((error) => {
    log.trace("Authentification failed, redirect to Auth process");
    throw error;
  });
}

export const jepFetch = configureJepFetch({
  shouldAuthenticate,
  authentificate,
  fetch: fetchJSON,
});