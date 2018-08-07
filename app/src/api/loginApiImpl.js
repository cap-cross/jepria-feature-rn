// loginApiImpl.js - реализация loginApi

// import { configureJepFetch, fetchJSON } from '../'; // from 'jep-fetch'
import fetchJSON from './fetchJSON'; // from 'jep-fetch'
import configureJepFetch from './configureJepFetch';

import loginMediator from '../loginMediator';
import FEATURE_CONTEXT_URL from './apiConfig';
import * as UserActions from '../redux/user/userActions';
import log from '@cap-cross/cap-core';

const SSO_CONTEXT_PART = 'SsoUi'; // Может быть также SsoUi_XX

const USER_DATA_API_URL = `${FEATURE_CONTEXT_URL}/userData`;

const isAuthorizationError = error => error.message.indexOf(SSO_CONTEXT_PART) > -1;

const encodedParams = (params) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};

const shouldAuthenticate = error => isAuthorizationError(error);

export const isSsoLoginRequest = (response) => {
  log.trace(`loginApiImpl.isSsoLoginRequest(): response.status = ${response.status}`);
  log.trace(`loginApiImpl.isSsoLoginRequest(): response.url = ${response.url}`);

  const result = response.status === 200 && response.url.indexOf(SSO_CONTEXT_PART) > -1;
  log.trace(`loginApiImpl.isSsoLoginRequest() = ${result}`);
  return result;
};

const getCredentials = () =>
  new Promise((resolve) => {
    // "Подписка" (установка callback) на loginForm submit
    loginMediator.loginSubmitListener = (credentials) => {
      // loginMediator.closeLoginForm();
      resolve(credentials);
    };

    loginMediator.openLoginForm();
  });

const authenticate = (ssoContextUrl) => {
  log.trace(`loginApiImpl.authenticate(${ssoContextUrl}) BEGIN`);

  return getCredentials()
    .then(({ username, password }) => {
      const params = {
        j_username: username,
        j_password: password,
      };
      const authenticationUrl = `${ssoContextUrl}/j_security_check?${encodedParams(params)}`;

      log.trace(`loginApiImpl.authenticate(): authenticationUrl = ${authenticationUrl}`);
      //loginMediator.openAuthRequestWaitBar();
      return fetch(authenticationUrl, {
        method: 'POST',
        credentials: 'include',
      })
      .then((response) => {
        log.trace(`loginApiImpl.authenticate(): response = ${JSON.stringify(response)}`);
        //loginMediator.closeAuthRequestWaitBar();
        loginMediator.closeLoginForm();
        return response;
      })
      .catch((error) => {
        log.trace(
          `loginApiImpl.getCredentials().then.fetch(${authenticationUrl}).catch: fetch error = ${
            error
          }`,
        );
        //loginMediator.closeAuthRequestWaitBar();
        throw error;
      });
    })
    .catch((error) => {
      log.trace(`loginApiImpl.getCredentials().then.catch(): error = ${error}`);
      throw error;
    });
};

export const jepFetch = configureJepFetch({
  shouldAuthenticate,
  authenticate,
  fetch: fetchJSON,
});
