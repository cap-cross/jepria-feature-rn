import * as actions from './userActions.js';
import {FEATURE_CONTEXT_URL} from '../../api/apiConfig';
import { jepFetch } from '../../api/loginApiImpl';
import log from '@cap-cross/cap-core';

const USER_DATA_API_URL = `${FEATURE_CONTEXT_URL}/userdata`;
const LOGOUT_URL = `${FEATURE_CONTEXT_URL}/logout`;

export const getUserData = () => {
    return (dispatch) => {
      log.trace(`getUserData(): BEGIN`);
      dispatch(actions.fetchUser(true));
      log.trace("fetching getUserData():" + USER_DATA_API_URL);
      jepFetch(USER_DATA_API_URL)
        .then((response) => {
          dispatch(actions.fetchUserSuccess(response.body));
        })
        .catch((error) => {
          log.trace(
            `getUserData().then.fetch(${USER_DATA_API_URL}).catch: fetch error = ${error}`);
            dispatch(actions.fetchUserFailure(true, error.message));
        });
    };
  }

  export const logout = () => {
    log.trace("LOGOUT");
    return (dispatch) => {
      return fetch(LOGOUT_URL)
        .then((response) => {
          log.trace("LOGOUT RESPONSE " + JSON.stringify(response));
          dispatch(actions.logout());
          return response.text();
        })
        .catch((error) => {
          log.trace("LOGOUT PROCESSING ERROR " + error.message); 
          throw error;
        });
    };
  }
