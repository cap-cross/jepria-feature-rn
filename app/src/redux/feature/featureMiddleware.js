import {setSearchTemplate, find,  create, update, remove, fetch, findById, createProcess } from '../../api/FeatureAPI';
import * as actions from './featureActions'

export const findFeature = (searchTemplate) => {
  return (dispatch) => {
    dispatch(actions.fetchFeatures(searchTemplate, true));
    return setSearchTemplate({
        ...searchTemplate,
        statusCodeList: searchTemplate.statusCodeList ? searchTemplate.statusCodeList.map(status => status.value) : undefined,
        authorId: searchTemplate.authorId ? searchTemplate.authorId.value : undefined,
        responsibleId: searchTemplate.responsibleId ? searchTemplate.responsibleId.value : undefined
      })
      .then(searchUrl => {
        find(searchUrl, 1000, 1)
          .then((response) => {
            dispatch(actions.fetchFeaturesSuccess(searchTemplate, response));
            return response;
          })
          .catch((error) => {
            dispatch(actions.fetchFeaturesFailure(searchTemplate, true, error.message));
          });
      })
      .catch((error) => {
        dispatch(actions.fetchFeaturesFailure(searchTemplate, true, error.message));
      });
  };
};

export const updateFeature = (featureId, feature, statusCode) => {
  return (dispatch) => {
    dispatch(actions.updateFeature(true));
    return update(featureId, feature)
      .then((response) => {
        if (response) {
          return createProcess(featureId, statusCode)
            .then(() => {
              return findById(featureId)
                .then(feature => {
                  dispatch(actions.updateFeatureSuccess(feature));
                  return feature;
                })
                .catch((error) => {
                  dispatch(actions.updateFeatureFailure(feature, true, error.message));
                  throw error;
                });
            })
            .catch((error) => {
              dispatch(actions.updateFeatureFailure(feature, true, error.message));
              throw error;
            });
        }
      })
      .catch((error) => {
        dispatch(actions.updateFeatureFailure(feature, true, error.message));
        throw error;
      });
  };
};

export const createFeature = (feature) => {
  return (dispatch) => {
    dispatch(actions.createFeature(true));
    return create(feature)
      .then((url) => {
        return fetch(url)
          .then(response => {
            return response.json()
              .then(feature => {
                dispatch(actions.createFeatureSuccess(response));
                return feature;
              })
              .catch((error) => {
                dispatch(actions.createFeatureFailure(feature, true, error.message));
                throw error;
              });
          })
          .catch((error) => {
            dispatch(actions.createFeatureFailure(feature, true, error.message));
            throw error;
          });
      })
      .catch((error) => {
        dispatch(actions.createFeatureFailure(feature, true, error.message));
        throw error;
      });
  };
};

export const deleteFeature = (feature) => {
  return (dispatch) => {
    dispatch(actions.deleteFeature(true));
    return remove(feature)
      .then((response) => {
        dispatch(actions.deleteFeatureSuccess(response));
        return response;
      })
      .catch((error) => {
        dispatch(actions.deleteFeatureFailure(feature, true, error.message));
        throw error;
      });
  };
};