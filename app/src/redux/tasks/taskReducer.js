import * as TaskActions from './taskActions';
import log from '@cap-cross/cap-core';

const initialState = {
  filter: {},
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
    case TaskActions.FETCH_TASKS_BEGIN: {
      log.trace('Task reducer: FETCH_TASKS_BEGIN');
      return {
        ...state,
        items: [],
        filter: payload.filter,
        isFetching: payload.isFetching
      };
    }
    case TaskActions.FETCH_TASKS_FAILURE: {
      log.trace('Task reducer: FETCH_TASKS_FAILURE');
      return {
        ...state,
        items: [],
        isFetching: false,
        isFailed: payload.isFailed,
        errorMessage: payload.errorMessage
      }
    }
    case TaskActions.FETCH_TASKS_SUCCESS: {
      log.trace('Task reducer: FETCH_TASKS_SUCCESS');
      return {
        ...state,
        filter: payload.filter,
        items: payload.items,
        isFetching: false,
        isFailed: false,
      };
    }
    case TaskActions.UPDATE_TASK_BEGIN: {
      log.trace('Task reducer: UPDATE_TASK_BEGIN');
      return {
        ...state,
        isUpdating: payload.isUpdating
      };
    }
    case TaskActions.UPDATE_TASK_FAILURE: {
      log.trace('Task reducer: UPDATE_TASK_FAILURE');
        return {
          ...state,
          isUpdating: false,
          isFailed: payload.isFailed,
          errorMessage: payload.errorMessage
        }
    }
    case TaskActions.UPDATE_TASK_SUCCESS: {
      log.trace('Task reducer: UPDATE_TASK_SUCCESS');
      return {
        ...state,
        activeItem: payload.task,
        isUpdating: false,
        isFailed: false,
      };
    }
    case TaskActions.CREATE_TASK_BEGIN: {
      log.trace('Task reducer: CREATE_TASK_BEGIN');
      return {
        ...state,
        isCreating: payload.isCreating
      };
    }
    case TaskActions.CREATE_TASK_FAILURE: {
      log.trace('Task reducer: CREATE_TASK_FAILURE');
      return {
        ...state,
        isCreating: false,
        isFailed: payload.isFailed,
        errorMessage: payload.errorMessage
      }
    }
    case TaskActions.CREATE_TASK_SUCCESS: {
      log.trace('Task reducer: CREATE_TASK_SUCCESS');
      return {
        ...state,
        activeItem: payload.task,
        isCreating: false,
        isFailed: false,
      };
    }
    case TaskActions.DELETE_TASK_BEGIN: {
      log.trace('Task reducer: DELETE_TASK_BEGIN');
      return {
        ...state,
        isDeleting: payload.isDeleting
      };
    }
    case TaskActions.DELETE_TASK_FAILURE: {
      log.trace('Task reducer: DELETE_TASK_FAILURE');
      return {
        ...state,
        isDeleting: false,
        isFailed: payload.isFailed,
        errorMessage: payload.errorMessage
      }
    }
    case TaskActions.DELETE_TASK_SUCCESS: {
      log.trace('Task reducer: CREATE_TASK_SUCCESS');
      return {
        ...state,
        activeItem: {},
        isDeleting: false,
        isFailed: false,
      };
    }
    case TaskActions.SET_ACTIVE_TASK:
      return {
        ...state,
        activeItem: payload.activeItem,
      }

    default:
      return state;
  }
}
