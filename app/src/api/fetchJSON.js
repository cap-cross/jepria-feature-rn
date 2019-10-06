/* global fetch */
// import "isomorphic-fetch" // Только для web!

import merge from 'lodash/merge';
import * as security from './LoginAPI';
import * as Errors from './errors';

const checkStatus = ({ response, body }) => {
  console.log('fetchJSON.checkStatus()');
  if (security.isSsoLoginRequest(response)) {
    // TODO Надо как-нибудь выпрямить (передать url более естественным образом)
    const error = new Error(response.url);
    console.log(`fetchJSON.checkStatus() error = ${error}`);
    throw error;
  } else if (response.ok) {
    console.log('fetchJSON.checkStatus() success');
    return { response, body };
  } else {
    const error = new Error(body);
    error.response = response;
    error.body = body;
    throw error;
  }
};

const parseJSON = (response) => {
  console.log('fetchJSON.parseJSON()');
  const isJsonResponse =
    response.headers.get('content-type') &&
    response.headers
      .get('content-type')
      .toLowerCase()
      .indexOf('application/json') >= 0;
  if (isJsonResponse) {
    return response.json().then(data => {
      //console.log('fetchJSON.parseJSON(): ' + JSON.stringify(data));
      return data
    });
  } else {
    return null;
  }
};

const validateResponse = (response) => {
  console.log("fetchJSON: validating response...");
  if (response.status === 403) {
    console.log("fetchJSON: access to resource denied, need authorization...");
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

  console.log(`fetchJSON() initJson = ${JSON.stringify(initJson)}`);

  return fetch(input, initJson)
    .then(validateResponse)
    //.then(checkStatus);
};

export default fetchJSON;
