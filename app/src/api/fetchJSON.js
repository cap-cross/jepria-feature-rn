/* global fetch */
// import "isomorphic-fetch" // Только для web!

import merge from 'lodash/merge';
import * as security from './LoginAPI';
import log from '@cap-cross/cap-core';
import * as Errors from './errors';

const checkStatus = ({ response, body }) => {
  log.trace('fetchJSON.checkStatus()');
  if (security.isSsoLoginRequest(response)) {
    // TODO Надо как-нибудь выпрямить (передать url более естественным образом)
    const error = new Error(response.url);
    log.trace(`fetchJSON.checkStatus() error = ${error}`);
    throw error;
  } else if (response.ok) {
    log.trace('fetchJSON.checkStatus() success');
    return { response, body };
  } else {
    const error = new Error(body);
    error.response = response;
    error.body = body;
    throw error;
  }
};

const parseJSON = (response) => {
  log.trace('fetchJSON.parseJSON()');
  const isJsonResponse =
    response.headers.get('content-type') &&
    response.headers
      .get('content-type')
      .toLowerCase()
      .indexOf('application/json') >= 0;
  if (isJsonResponse) {
    return response.json().then(data => {
      //log.trace('fetchJSON.parseJSON(): ' + JSON.stringify(data));
      return data
    });
  } else {
    return null;
  }
};

const validateResponse = (response) => {
  log.trace("fetchJSON: validating response...");
  if (response.status === 403) {
    log.trace("fetchJSON: access to resource denied, need authorization...");
    throw new Errors.APIError("Доступ к ресурсу запрещен требуется авторизация...", Errors.ACCESS_DENIED);
  } else if (!response.ok) {
    return response.text()
    .then((data) => {throw new Errors.APIError(data, Errors.SERVER_ERROR)})
  } else {
    return parseJSON(response);
  }
}

const fetchJSON = (input, init) => {
  const initJson = merge(
    {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
    init,
  );

  log.trace(`fetchJSON() initJson = ${JSON.stringify(initJson)}`);

  return fetch(input, initJson)
    .then(validateResponse)
    //.then(checkStatus);
};

export default fetchJSON;
