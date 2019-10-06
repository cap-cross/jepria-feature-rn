import * as actions from './userActions.js';
import {FEATURE_CONTEXT_URL} from '../../api/apiConfig';
import { processLogin, jepFetch } from '../../api/LoginAPI';

const USER_DATA_API_URL = `${FEATURE_CONTEXT_URL}/userdata`;
const LOGOUT_URL = `${FEATURE_CONTEXT_URL}/logout`;

export const getUserData = () => {
    return (dispatch) => {
      console.log(`getUserData(): BEGIN`);
      dispatch(actions.fetchUser(true));
      console.log("fetching getUserData():" + USER_DATA_API_URL);
      jepFetch(USER_DATA_API_URL)
        .then((response) => {
          dispatch(actions.fetchUserSuccess(response));
        })
        .catch((error) => {
          dispatch(actions.fetchUserFailure(true, error.message));
        });
    };
  }

  export const login = (username, password) => {
      return (dispatch) => {
        console.log(`login(): BEGIN`);
        dispatch(actions.loginUser(true));
        console.log("Processing login():" + USER_DATA_API_URL);
        return processLogin(username, password)
          .then((response) => {
            dispatch(actions.loginUserSuccess());
            //getUserData();
            return response;
          })
          .catch((error) => {
            dispatch(actions.loginUserFailure(true, error.message));
            throw error;
          });
      };
    }

  export const logout = () => {
    console.log("LOGOUT");
    return (dispatch) => {
      return fetch(LOGOUT_URL)
        .then((response) => {
          console.log("LOGOUT RESPONSE " + JSON.stringify(response));
          dispatch(actions.logout());
          return response.text();
        })
        .catch((error) => {
          console.log("LOGOUT PROCESSING ERROR " + error.message); 
          throw error;
        });
    };
  }
