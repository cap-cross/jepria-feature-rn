import * as FeatureActions from './featureActions';

const initialState = {
  searchTemplate: {},
  items: [],
  activeItem: {},
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFailed: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FeatureActions.FETCH_FEATURES_BEGIN: {
      console.log('Feature reducer: FETCH_FEATURES_BEGIN');
      return {
        ...state,
        items: [],
        searchTemplate: payload.searchTemplate,
        isFetching: payload.isFetching,
        isFailed: false
      };
    }
    case FeatureActions.FETCH_FEATURES_FAILURE: {
      console.log('Feature reducer: FETCH_FEATURES_FAILURE');
      return {
        ...state,
        items: [],
        isFetching: false,
        isFailed: payload.isFailed,
        errorMessage: payload.errorMessage
      }
    }
    case FeatureActions.FETCH_FEATURES_SUCCESS: {
      console.log('Feature reducer: FETCH_FEATURES_SUCCESS');
      return {
        ...state,
        searchTemplate: payload.searchTemplate,
        items: payload.items,
        isFetching: false,
        isFailed: false,
      };
    }
    case FeatureActions.UPDATE_FEATURE_BEGIN: {
      console.log('Feature reducer: UPDATE_FEATURE_BEGIN');
      return {
        ...state,
        isUpdating: payload.isUpdating,
      };
    }
    case FeatureActions.UPDATE_FEATURE_FAILURE: {
      console.log('Feature reducer: UPDATE_FEATURE_FAILURE');
        return {
          ...state,
          isUpdating: false
        }
    }
    case FeatureActions.UPDATE_FEATURE_SUCCESS: {
      console.log('Feature reducer: UPDATE_FEATURE_SUCCESS');
      return {
        ...state,
        activeItem: payload.feature,
        isUpdating: false
      };
    }
    case FeatureActions.CREATE_FEATURE_BEGIN: {
      console.log('Feature reducer: CREATE_FEATURE_BEGIN');
      return {
        ...state,
        isCreating: payload.isCreating,
      };
    }
    case FeatureActions.CREATE_FEATURE_FAILURE: {
      console.log('Feature reducer: CREATE_FEATURE_FAILURE');
      return {
        ...state,
        isCreating: false,
      }
    }
    case FeatureActions.CREATE_FEATURE_SUCCESS: {
      console.log('Feature reducer: CREATE_FEATURE_SUCCESS');
      return {
        ...state,
        activeItem: payload.feature,
        isCreating: false,
      };
    }
    case FeatureActions.DELETE_FEATURE_BEGIN: {
      console.log('Feature reducer: DELETE_FEATURE_BEGIN');
      return {
        ...state,
        isDeleting: payload.isDeleting,
      };
    }
    case FeatureActions.DELETE_FEATURE_FAILURE: {
      console.log('Feature reducer: DELETE_FEATURE_FAILURE');
      return {
        ...state,
        isDeleting: false,
      }
    }
    case FeatureActions.DELETE_FEATURE_SUCCESS: {
      console.log('Feature reducer: CREATE_FEATURE_SUCCESS');
      return {
        ...state,
        activeItem: {},
        isDeleting: false,
      };
    }
    case FeatureActions.SET_ACTIVE_FEATURE:
      return {
        ...state,
        activeItem: payload.activeItem,
      }

    default:
      return state;
  }
}
