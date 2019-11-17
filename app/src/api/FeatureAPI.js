// API.js
import * as api from './ApiConfig';
import * as errors from './errors'

const fetchRest = (url, parameters) => {
  
  let parameters2 = {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic bmFnb3JueXlzOjEyMw==',
      'X-Cache-Control': 'no-cache'
    },
    ...parameters
  }

  console.log(`fetch(${url}) with parameters = ${JSON.stringify(parameters2)}`);

  return fetch(url, parameters2)
    .then((response) => {
      if (response.status === 401) {
        throw new errors.APIError("Войдите в систему для доступа к ресурсу", errors.AUTHENTICATION_ERROR);
      } else if (response.status === 403) {
        throw new errors.APIError("Доступ к ресурсу запрещен", errors.ACCESS_DENIED);
      } else if (response.status === 500) {
        throw new errors.APIError("При обращении к сервису возникла непредвиденная ошибка", errors.SERVER_ERROR);
      } else {
        return new Promise((resolve, reject) => {
          resolve(response);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const setSearchTemplate = searchTemplate => {
  return fetchRest(api.FEATURE_API_URL + '/search',
    {
      method: 'POST',
      body: JSON.stringify({
        template: {
          ...searchTemplate,
          maxRowCount: 1000
        }
      })
    })
    .then(response => {
      if (response.ok) {
        return new Promise((resolve, reject) => { 
          resolve(response.headers.get("Location"));
        });
      }
    })
    .catch(error => {
        throw error;
    })
}

const find = (url, pageSize, pageNumber) => {
  return fetchRest(url + '/resultset?pageSize=' + pageSize + '&page=' + pageNumber)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        return new Promise((resolve, reject) => { 
          resolve([]);
        });
      }
    })
    .catch(error => {
      throw error;
    })
}

const findById = featureId => {
  return fetchRest(api.FEATURE_API_URL + '/' + featureId)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => {
      throw error;
    })
}

const create = feature => {
  return fetchRest(api.FEATURE_API_URL, {
    method: 'POST',
    body: JSON.stringify(feature)
  })
    .then(response => {
      if (response.ok) {
        return new Promise((resolve, reject) => {
          resolve(response.headers.get("Location"));
        });
      }
    })
    .catch(error => {
      throw error;
    })
}

const update = (featureId, feature) => {
  return fetchRest(api.FEATURE_API_URL + '/' + featureId, {
    method: 'PUT',
    body: JSON.stringify(feature)
  })
    .then(response => {
      if (response.ok) {
        return new Promise((resolve, reject) => {
          resolve(response.ok);
        });
      }
    })
    .catch(error => {
      throw error;
    })
}

const remove = featureId => {
  return fetchRest(api.FEATURE_API_URL + '/' + featureId, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return new Promise((resolve, reject) => {
          resolve(response.ok);
        });
      }
    })
    .catch(error => {
      throw error;
    })
}

const getStatuses = () => {
  return fetchRest(api.FEATURE_STATUS_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => {
      throw error;
    })
}

const getOperators = () => {
  return fetchRest(api.FEATURE_OPERATOR_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => {
      throw error;
    })
}

const findProcess = featureId => {
  return fetchRest(api.FEATURE_API_URL + '/' + featureId + '/feature-process')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(error => {
      throw error;
    })
}

const createProcess = (featureId, statusCode) => {
  return fetchRest(api.FEATURE_API_URL + '/' + featureId + '/feature-process', {
    method: 'POST',
    body: JSON.stringify({
      featureStatusCode: statusCode
    })
  })
    .then(response => {
      if (response.ok) {
        return new Promise((resolve, reject) => {
          resolve(response.ok);
        });
      }
    })
    .catch(error => {
      throw error;
    })
}

const removeProcess = featureId => {
  return fetchRest(api.FEATURE_API_URL + '/' + featureId + '/feature-process', {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        return new Promise((resolve, reject) => {
          resolve(response.ok);
        });
      }
    })
    .catch(error => {
      throw error;
    })
}

export {setSearchTemplate, find, findById, create, update, remove, 
  getStatuses, getOperators, findProcess, createProcess, removeProcess, fetchRest as fetch };