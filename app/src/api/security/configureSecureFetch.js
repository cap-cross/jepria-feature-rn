
import log from '@cap-cross/cap-core';
import {loginAPI} from '../../config/di';

function configureSecureFetch(loginApi) {
  const {credentialedFetchPromise, authenticate, shouldAuthenticate} = loginApi;

  return async (input, init) => {
    const credentialedFetch = await credentialedFetchPromise;
    return credentialedFetch(input, init)
      .catch((error) => {
        if (shouldAuthenticate(error)) {
          log.info("secureFetch: Credentials have expired, refreshing them...");
          return authenticate()
            .then((newSecureFetch) => {
              return newSecureFetch(input, init);
            })
            .catch(() => {
              log.error("secureFetch: Continue with original error...");
              throw error;
            });
        }
        throw error;
      });
  };
}

export const secureFetch = configureSecureFetch(loginAPI);
