
import merge from 'lodash/merge';
import log from '@cap-cross/cap-core';

function configureJepFetch(loginApi = {}) {
  const { getTokens, authenticate, shouldAuthenticate, fetch } = loginApi;

  return async (input, init) => {
    let {accessToken} = await getTokens(); //get JWT tokens
    return fetch(input, merge(
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        },
        init,
      )).catch((error) => {
        if (shouldAuthenticate(error)) {
          log.trace("JepFetch: Access Token has expired, refreshing tokens...");
          return authenticate()
            .then((tokens) => {
              return fetch(input, merge(
                {
                  headers: {
                    'Authorization': 'Bearer ' + tokens.accessToken,
                  },
                },
                init,
              ));
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
