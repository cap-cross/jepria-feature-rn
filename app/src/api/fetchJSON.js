/* global fetch */
// import "isomorphic-fetch" // Только для web!

import merge from 'lodash/merge';
import * as security from './loginApiImpl';
import log from '@cap-cross/cap-core';

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
  if (response.ok) {
    log.trace('fetchJSON.parseJSON()');
    const isJsonResponse =
      response.headers.get('content-type') &&
      response.headers
        .get('content-type')
        .toLowerCase()
        .indexOf('application/json') >= 0;
    if (isJsonResponse) {
      return response.json().then(body => ({ response, body }));
    } else {
      return Promise.resolve({ response, body: null });
    }
  } else {
    return response.text().then((text => ({ response, body: text })));
  }
};

const fetchJSON = (input, init) => {
  const initJson = merge(
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    init,
  );

  log.trace(`fetchJSON() initJson = ${JSON.stringify(initJson)}`);

  return fetch(input, initJson)
    .then(parseJSON)
    .then(checkStatus);
};

export default fetchJSON;
