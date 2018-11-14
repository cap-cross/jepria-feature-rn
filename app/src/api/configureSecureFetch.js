
import log from '@cap-cross/cap-core';
import {loginAPI} from '../DI/diConfig';

function configureSecureFetch(loginApi) {
  const {credentialedFetchPromise, authenticate, shouldAuthenticate} = loginApi;

  return async (input, init) => {
    const credentialedFetch = await credentialedFetchPromise;
    return credentialedFetch(input, init)
      .catch((error) => {
        if (shouldAuthenticate(error)) {
          log.info("secureFetch: Access Token has expired, refreshing tokens...");
          return authenticate()
            .then((newSecureFetch) => {
              return newSecureFetch(input, init);
            })
            .catch(() => {
              log.trace("secureFetch: Continue with original error...");
              throw error;
            });
        }
        throw error;
      });
  };
}

export const secureFetch = configureSecureFetch(loginAPI);
