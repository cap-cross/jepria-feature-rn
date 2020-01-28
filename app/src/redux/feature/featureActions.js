export const SET_ACTIVE_FEATURE='SET_ACTIVE_FEATURE';

export const FETCH_FEATURES_BEGIN = 'FETCH_FEATURES_BEGIN';
export const FETCH_FEATURES_SUCCESS = 'FETCH_FEATURES_SUCCESS';
export const FETCH_FEATURES_FAILURE = 'FETCH_FEATURES_FAILURE';

export const CREATE_FEATURE_BEGIN = 'CREATE_FEATURE_BEGIN';
export const CREATE_FEATURE_SUCCESS = 'CREATE_FEATURE_SUCCESS';
export const CREATE_FEATURE_FAILURE = 'CREATE_FEATURE_FAILURE';

export const UPDATE_FEATURE_BEGIN = 'UPDATE_FEATURE_BEGIN';
export const UPDATE_FEATURE_SUCCESS = 'UPDATE_FEATURE_SUCCESS';
export const UPDATE_FEATURE_FAILURE = 'UPDATE_FEATURE_FAILURE';

export const DELETE_FEATURE_BEGIN = 'DELETE_FEATURE_BEGIN';
export const DELETE_FEATURE_SUCCESS = 'DELETE_FEATURE_SUCCESS';
export const DELETE_FEATURE_FAILURE = 'DELETE_FEATURE_FAILURE';


export function setActiveFeature(activeItem) {
    console.log("SET ACTIVE FEATURE");
    return {
      type: SET_ACTIVE_FEATURE,
      payload: {
        activeItem,
      },
    };
  }

export function fetchFeatures(searchTemplate, isFetching) {
  console.log("FETCH Features BEGIN");

  return {
      type: FETCH_FEATURES_BEGIN,
      payload : {
          searchTemplate,
          isFetching,
      }
  }
}

export function fetchFeaturesSuccess(searchTemplate, items) {
  console.log("FETCH Features SUCCESS foundItems: " + JSON.stringify(items.length));

  return {
      type: FETCH_FEATURES_SUCCESS,
      payload : {
        searchTemplate,
        items,
      }
  }
}

export function fetchFeaturesFailure(searchTemplate, isFailed, errorMessage) {
  console.log("FETCH Features FAILURE " + errorMessage);

  return {
      type: FETCH_FEATURES_FAILURE,
      payload : {
          searchTemplate,
          isFailed,
          errorMessage,
      }
  }
}


export function updateFeature(isUpdating) {
    console.log("UPDATE Feature BEGIN");
  
    return {
        type: UPDATE_FEATURE_BEGIN,
        payload : {
            isUpdating,
        }
    }
  }
  
  export function updateFeatureSuccess(feature) {
    console.log("UPDATE Feature SUCCESS");
  
    return {
        type: UPDATE_FEATURE_SUCCESS,
        payload : {
            feature
        }
    }
  }
  
  export function updateFeatureFailure(feature, isFailed, errorMessage) {
    console.log("UPDATE Feature FAILURE " + errorMessage);
  
    return {
        type: UPDATE_FEATURE_FAILURE,
        payload : {
            feature,
            isFailed,
            errorMessage,
        }
    }
  }

  export function createFeature(isCreating) {
      console.log("CREATE Feature BEGIN");
    
      return {
          type: CREATE_FEATURE_BEGIN,
          payload : {
            isCreating,
          }
      }
    }
    
    export function createFeatureSuccess(feature) {
      console.log("CREATE Feature SUCCESS");
    
      return {
          type: CREATE_FEATURE_SUCCESS,
          payload : {
              feature
          }
      }
    }
    
    export function createFeatureFailure(feature, isFailed, errorMessage) {
      console.log("CREATE Feature FAILURE " + errorMessage);
    
      return {
          type: CREATE_FEATURE_FAILURE,
          payload : {
              feature,
              isFailed,
              errorMessage,
          }
      }
    }

    export function deleteFeature(isDeleting) {
        console.log("DELETE Feature BEGIN");
      
        return {
            type: DELETE_FEATURE_BEGIN,
            payload : {
                isDeleting,
            }
        }
      }
      
      export function deleteFeatureSuccess(feature) {
        console.log("DELETE Feature SUCCESS");

        return {
            type: DELETE_FEATURE_SUCCESS,
        }
      }
      
      export function deleteFeatureFailure(feature, isFailed, errorMessage) {
        console.log("DELETE Feature FAILURE " + errorMessage);
      
        return {
            type: DELETE_FEATURE_FAILURE,
            payload : {
                isFailed,
                errorMessage,
            }
        }
      }