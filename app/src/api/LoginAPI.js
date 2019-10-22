import {BASE_URL, FEATURE_SERVICE_CONTEXT} from './ApiConfig';
import * as SecureStore from 'expo-secure-store';
import * as Errors from './errors';

const LOGIN_API_URL = `${BASE_URL}/${FEATURE_SERVICE_CONTEXT}/LoginServlet?`;


export const authenticateByCredentials = (username, password) => {
  console.log("Processing authentication...");
  return fetch(LOGIN_API_URL + 'username=' + username + '&password=' + password,
  {
    method: 'POST',
    credentials: 'include'
  })
  .then((response) => {
    if (response.ok) {
      console.log("Authentication completed...");
      saveCredentials(username, password);
      return response;
    } else {
      if(response.status === 401) throw new Errors.APIError("Неверные данные", Errors.AUTHENTICATION_ERROR);
      else throw new Error("Network connection problem");
    }
  })
  .catch((error) => {
    console.log("Authentication failed: " + error.message);
    throw error;
  })
};

export const getCredentials = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Resolving credentials...")
    let username, password;
    username = await SecureStore.getItemAsync("username");
    password = await SecureStore.getItemAsync("password");
    pin = await SecureStore.getItemAsync("pin");
    hasFingerPrint = await SecureStore.getItemAsync("hasFingerPrint");
    if (username === null || password === null) {
      console.log("Failed to resolve credential...")
      reject(new Errors.APIError("No credentials found", Errors.NO_CREDENTIALS_ERROR));
    } else {
      console.log("Credentials resolved...")
      resolve({username, password, pin, hasFingerPrint});
    }
  });
}

const saveCredentials = async (username, password) => {
  try {
    console.log("Saving credentials...");
    await SecureStore.setItemAsync("username", username);
    await SecureStore.setItemAsync("password", password);
  } catch (error) {
    console.log("Error occured while saving credentials: " + error.message);
  }
}

export const authenticate = () => {
  console.log("Authenticating...")
  return getCredentials()
  .then(async (credentials) => {
    await authenticateByCredentials(credentials.username, credentials.password)
    .then((response) => {
      console.log("Authentication completed");
      return response;
    })
    .catch((error) => {
      console.log("Authentication failed, redirect to Auth process");
      throw error;
    });
  })
  .catch((error) => {
    console.log("Authentication failed, redirect to Auth process");
    throw error;
  });
}