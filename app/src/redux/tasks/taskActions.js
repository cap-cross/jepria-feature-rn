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
    console.log("SET ACTIVE TASK " + JSON.stringify(activeItem));
    return {
      type: SET_ACTIVE_TASK,
      payload: {
        activeItem,
      },
    };
  }

export function fetchTasks(filter, isFetching) {
  console.log("FETCH featureTasks BEGIN " + isFetching);

  return {
      type: FETCH_TASKS_BEGIN,
      payload : {
          filter,
          isFetching,
      }
  }
}

export function fetchTasksSuccess(filter, items) {
  console.log("FETCH featureTasks SUCCESS foundItems: " + JSON.stringify(items.length));

  return {
      type: FETCH_TASKS_SUCCESS,
      payload : {
        filter,
        items,
      }
  }
}

export function fetchTasksFailure(filter, isFailed, errorMessage) {
  console.log("FETCH featureTasks FAILURE " + isFailed + " " + errorMessage);

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
    console.log("UPDATE featureTask BEGIN " + isUpdating);
  
    return {
        type: UPDATE_TASK_BEGIN,
        payload : {
            isUpdating,
        }
    }
  }
  
  export function updateTaskSuccess(task) {
    console.log("UPDATE featureTask SUCCESS foundItems: " + JSON.stringify(task));
  
    return {
        type: UPDATE_TASK_SUCCESS,
        payload : {
            task
        }
    }
  }
  
  export function updateTaskFailure(task, isFailed, errorMessage) {
    console.log("UPDATE featureTask FAILURE " + isFailed + " " + errorMessage);
  
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
      console.log("CREATE featureTask BEGIN " + isCreating);
    
      return {
          type: CREATE_TASK_BEGIN,
          payload : {
            isCreating,
          }
      }
    }
    
    export function createTaskSuccess(task) {
      console.log("CREATE featureTask SUCCESS foundItems: " + JSON.stringify(task));
    
      return {
          type: CREATE_TASK_SUCCESS,
          payload : {
              task
          }
      }
    }
    
    export function createTaskFailure(task, isFailed, errorMessage) {
      console.log("CREATE featureTask FAILURE " + isFailed + " " + errorMessage);
    
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
        console.log("DELETE featureTask BEGIN " + isDeleting);
      
        return {
            type: DELETE_TASK_BEGIN,
            payload : {
                isDeleting,
            }
        }
      }
      
      export function deleteTaskSuccess(task) {
        console.log("DELETE featureTask SUCCESS deletedItem: " + JSON.stringify(task));
      
        return {
            type: DELETE_TASK_SUCCESS,
        }
      }
      
      export function deleteTaskFailure(task, isFailed, errorMessage) {
        console.log("DELETE featureTask FAILURE " + isFailed + " " + errorMessage + " " + JSON.stringify(task));
      
        return {
            type: DELETE_TASK_FAILURE,
            payload : {
                isFailed,
                errorMessage,
            }
        }
      }