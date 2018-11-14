import merge from 'lodash/merge';
import log from '@cap-cross/cap-core';
import * as Errors from './errors';

const parseJSON = (response) => {
  const isJsonResponse =
    response.headers.get('content-type') &&
    response.headers
      .get('content-type')
      .toLowerCase()
      .indexOf('application/json') >= 0;
  if (isJsonResponse) {
    return response.json().then(data => {
      return data
    });
  } else {
    return null;
  }
};

const validateResponse = (response) => {
  log.trace("fetchJSON: validating response...");
  if (response.status === 401) {
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

  return fetch(input, initJson)
    .then(validateResponse)
};

export default fetchJSON;
