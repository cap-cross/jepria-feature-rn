import {tasks} from '../../api/FeatureAPI';
import * as actions from './taskActions'
import log from '@cap-cross/cap-core';

export const findTasks = (filter) => {
  return (dispatch) => {
    dispatch(actions.fetchTasks(filter, true));
    return tasks
      .find(filter)
      .then((response) => {
        dispatch(actions.fetchTasksSuccess(filter, response));
        return response;
      })
      .catch((error) => {
        dispatch(actions.fetchTasksFailure(filter, true, error.message));
      });
  };
};

export const updateTask = (task) => {
  return (dispatch) => {
    dispatch(actions.updateTask(true));
    return tasks
      .updateTask(task)
      .then((response) => {
        dispatch(actions.updateTaskSuccess(response));
        return response;
      })
      .catch((error) => {
        dispatch(actions.updateTaskFailure(task, true, error.message));
        throw error;
      });
  };
};

export const createTask = (task) => {
  return (dispatch) => {
    dispatch(actions.createTask(true));
    return tasks
      .addTask(task)
      .then((response) => {
        dispatch(actions.createTaskSuccess(response));
        return response;
      })
      .catch((error) => {
        dispatch(actions.createTaskFailure(task, true, error.message));
        throw error;
      });
  };
};

export const deleteTask = (task) => {
  return (dispatch) => {
    dispatch(actions.deleteTask(true));
    return tasks
      .removeTask(task)
      .then((response) => {
        dispatch(actions.deleteTaskSuccess(response));
        return response;
      })
      .catch((error) => {
        dispatch(actions.deleteTaskFailure(task, true, error.message));
        throw error;
      });
  };
};