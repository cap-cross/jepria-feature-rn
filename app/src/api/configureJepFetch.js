function configureJepFetch(loginApi = {}) {
  const { authenticate, shouldAuthenticate, fetch } = loginApi;

  let authenticationPromise = null;

  const extractContext = url =>
    url.substr(0, url.indexOf('/', url.indexOf('/', url.indexOf('//') + 2) + 1));

  return (input, init) => {
    return fetch(input, init).catch((error) => {
      if (shouldAuthenticate(error)) {
        // log.trace("REAUTHENTIFICATION");
        // return new Promise((resolve, reject) => {
        //   authenticate()
        //     .then(() => {
        //       log.trace("REAUTHENTIFICATION COMPLETED");
        //       resolve(fetch(input, init));
        //     })
        //     .catch((authenticationError) => {
        //       reject(authenticationError);
        //     });
        //   });
        if (authenticationPromise === null) {
          authenticationPromise = new Promise((resolve, reject) => {
            authenticate()
              .then(() => {
                authenticationPromise = null;
                resolve();
              })
              .catch((authenticationError) => {
                authenticationPromise = null;
                reject(authenticationError);
              });
          });
        }

        return authenticationPromise
          .then(() => fetch(input, init)).catch(() => {
          // If authentication fails, continue with original error
          throw error;
        });
      }
      throw error;
    });
  };
}

export default configureJepFetch;
