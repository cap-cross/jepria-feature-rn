// FeatureAPI.js
import * as apiConfig from './apiConfig';
import { jepFetch } from './LoginAPI';
import log from '@cap-cross/cap-core';

const buildFindUrl = (filter) => {
  // TODO Реализовать посерьёзнее
  let findUrl = apiConfig.FEATURE_API_FIND_URL;
  if (filter.id || filter.name || filter.nameEn || filter.description || (filter.statusCodeList && filter.statusCodeList.length > 0) || filter.authorId || filter.responsibleId) {
    findUrl += '?';
  }
  let first = true;
  if (filter.id) {
    findUrl += 'id=';
    findUrl += filter.id;
    first = false;
  }
  if (filter.name) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'name=';
    findUrl += filter.name;
    first = false;
  }
  if (filter.nameEn) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'nameEn=';
    findUrl += filter.nameEn;
    first = false;
  }
  if (filter.description) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'description=';
    findUrl += filter.description;
  }
  if (filter.description) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'description=';
    findUrl += filter.description;
    first = false;
  }
  if (filter.statusCodeList && filter.statusCodeList.length > 0) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'statusCodeList=';
    var re = new RegExp(',', 'g');
    findUrl += filter.statusCodeList.toString().replace(re,';');
    first = false;
  }
  if (filter.authorId) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'authorId=';
    findUrl += filter.authorId;
    first = false;
  }
  if (filter.responsibleId) {
    if (!first) {
      findUrl += '&';
    }
    findUrl += 'responsibleId=';
    findUrl += filter.responsibleId;
    first = false;
  }

  log.trace(`FeatureAPI.buildFindUrl(): findUrl = ${findUrl}`);
  return findUrl;
};

const features = {
  find(filter) {
    return jepFetch(buildFindUrl(filter));
  },

  addTask(task) {
    return jepFetch(apiConfig.FEATURE_API_ADD_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        name: task.name,
        nameEn: task.nameEn,
        description: task.description,
      }),
    })
      .then(({ response, body }) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        return body;
      })
      .catch((error) => {
        throw error;
      });
  },

  updateTask(task) {
    const updateTaskUrl = apiConfig.FEATURE_API_UPDATE_URL;
    return jepFetch(updateTaskUrl, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        nameEn: task.nameEn,
        description: task.description,
        statusCode: task.statusCode,
      }),
    })
      .then(({ response, body }) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        return body;
      })
      .catch((error) => {
        throw error;
      });
  },

  removeTask(task) {
    const removeTaskUrl = apiConfig.FEATURE_API_DELETE_URL;
    return jepFetch(`${removeTaskUrl}/${task.id}`, {
      method: 'DELETE',
    })
      .then(({ response, body }) => {
        if (!response.ok) {
          log.trace(`FeatureAPI.fetch.then: response.status = ${response.status}`);
          throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => {
        throw error;
      });
  },
};

// TODO Реализовать загрузку статусов
  const statuses = {  
    getStatuses() {
      return jepFetch(apiConfig.FEATURE_STATUSES_URL);
    }
  };

  const operators = {  
    getOperators() {
      return jepFetch(apiConfig.FEATURE_OPERATORS_URL);
    },
  };

  const featureProcess = {
    findTaskHistory(id) {
      return jepFetch(apiConfig.FEATURE_API_FIND_URL + '/' + id + '/featureprocess');
    }
  }

export {features as tasks, statuses, operators, featureProcess as taskHistory};