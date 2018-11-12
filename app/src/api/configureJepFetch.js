
import log from '@cap-cross/cap-core';

function configureJepFetch(loginApi) {
  const {secureFetch, authenticate, shouldAuthenticate} = loginApi;

  return async (input, init) => {
    // return secureFetch(input, init)
    const fetch = await secureFetch;
    return fetch(input, init)
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
