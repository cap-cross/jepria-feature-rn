function configureJepFetch(loginApi = {}) {
  const { authentificate, shouldAuthentificate, fetch } = loginApi;

  let authentificationPromise = null;

  const extractContext = url =>
    url.substr(0, url.indexOf('/', url.indexOf('/', url.indexOf('//') + 2) + 1));

  return (input, init) => {
    return fetch(input, init).catch((error) => {
      console.log(shouldAuthentificate(error));
      if (shouldAuthentificate(error)) {
        if (authentificationPromise === null) {
          authentificationPromise = new Promise((resolve, reject) => {
            authentificate()
              .then(() => {
                authentificationPromise = null;
                resolve();
              })
              .catch((authentificationError) => {
                authentificationPromise = null;
                reject(authentificationError);
              });
          });
        }

        return authentificationPromise
          .then(() => fetch(input, init)).catch(() => {
          // If authentification fails, continue with original error
          throw error;
        });
      }
      throw error;
    });
  };
}

export default configureJepFetch;
