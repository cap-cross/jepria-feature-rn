
import merge from 'lodash/merge';
import log from '@cap-cross/cap-core';

function configureJepFetch(loginApi) {
  const {secureFetch, authenticate, shouldAuthenticate} = loginApi;
  log.trace("configureJepFetch(): loginApi = " + JSON.stringify(loginApi));
  log.trace("configureJepFetch(): secureFetchPromise = " + secureFetch);
  log.trace("configureJepFetch(): authenticate = " + authenticate);
  log.trace("configureJepFetch(): shouldAuthenticate = " + shouldAuthenticate);

  return async (input, init) => {
    log.trace("configureJepFetch(): secureFetch = " + secureFetch);
    return await secureFetch(input, init)
      .catch((error) => {
        if (shouldAuthenticate(error)) {
          log.trace("JepFetch: Access Token has expired, refreshing tokens...");
          return authenticate()
            .then((newSecureFetch) => {
              return newSecureFetch(input, init);
            })
            .catch(() => {
              log.trace("JepFetch: Continue with original error...");
              throw error;
            });
        }
        throw error;
      });
  };
}

export default configureJepFetch;
