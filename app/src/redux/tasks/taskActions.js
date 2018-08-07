
import log from '@cap-cross/cap-core';

export const SET_ACTIVE_TASK='SET_ACTIVE_TASK';

export const FETCH_TASKS_BEGIN = 'FETCH_TASKS_BEGIN';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const CREATE_TASK_BEGIN = 'CREATE_TASK_BEGIN';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const UPDATE_TASK_BEGIN = 'UPDATE_TASK_BEGIN';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

export const DELETE_TASK_BEGIN = 'DELETE_TASK_BEGIN';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';


export function setActiveTask(activeItem) {
    log.trace("SET ACTIVE TASK " + JSON.stringify(activeItem));
    return {
      type: SET_ACTIVE_TASK,
      payload: {
        activeItem,
      },
    };
  }

export function fetchTasks(filter, isFetching) {
  log.trace("FETCH featureTasks BEGIN " + isFetching);

  return {
      type: FETCH_TASKS_BEGIN,
      payload : {
          filter,
          isFetching,
      }
  }
}

export function fetchTasksSuccess(filter, items) {
  log.trace("FETCH featureTasks SUCCESS foundItems: " + JSON.stringify(items.length));

  return {
      type: FETCH_TASKS_SUCCESS,
      payload : {
        filter,
        items,
      }
  }
}

export function fetchTasksFailure(filter, isFailed, errorMessage) {
  log.trace("FETCH featureTasks FAILURE " + isFailed + " " + errorMessage);

  return {
      type: FETCH_TASKS_FAILURE,
      payload : {
          filter,
          isFailed,
          errorMessage,
      }
  }
}


export function updateTask(isUpdating) {
    log.trace("UPDATE featureTask BEGIN " + isUpdating);
  
    return {
        type: UPDATE_TASK_BEGIN,
        payload : {
            isUpdating,
        }
    }
  }
  
  export function updateTaskSuccess(task) {
    log.trace("UPDATE featureTask SUCCESS foundItems: " + JSON.stringify(task));
  
    return {
        type: UPDATE_TASK_SUCCESS,
        payload : {
            task
        }
    }
  }
  
  export function updateTaskFailure(task, isFailed, errorMessage) {
    log.trace("UPDATE featureTask FAILURE " + isFailed + " " + errorMessage);
  
    return {
        type: UPDATE_TASK_FAILURE,
        payload : {
            task,
            isFailed,
            errorMessage,
        }
    }
  }

  export function createTask(isCreating) {
      log.trace("CREATE featureTask BEGIN " + isCreating);
    
      return {
          type: CREATE_TASK_BEGIN,
          payload : {
            isCreating,
          }
      }
    }
    
    export function createTaskSuccess(task) {
      log.trace("CREATE featureTask SUCCESS foundItems: " + JSON.stringify(task));
    
      return {
          type: CREATE_TASK_SUCCESS,
          payload : {
              task
          }
      }
    }
    
    export function createTaskFailure(task, isFailed, errorMessage) {
      log.trace("CREATE featureTask FAILURE " + isFailed + " " + errorMessage);
    
      return {
          type: CREATE_TASK_FAILURE,
          payload : {
              task,
              isFailed,
              errorMessage,
          }
      }
    }

    export function deleteTask(isDeleting) {
        log.trace("DELETE featureTask BEGIN " + isDeleting);
      
        return {
            type: DELETE_TASK_BEGIN,
            payload : {
                isDeleting,
            }
        }
      }
      
      export function deleteTaskSuccess(task) {
        log.trace("DELETE featureTask SUCCESS deletedItem: " + JSON.stringify(task));
      
        return {
            type: DELETE_TASK_SUCCESS,
        }
      }
      
      export function deleteTaskFailure(task, isFailed, errorMessage) {
        log.trace("DELETE featureTask FAILURE " + isFailed + " " + errorMessage + " " + JSON.stringify(task));
      
        return {
            type: DELETE_TASK_FAILURE,
            payload : {
                isFailed,
                errorMessage,
            }
        }
      }