import * as UserActions from './userActions';

const initialState = {
  userName: "",
  operatorId: "",
  userRoles: [],
  expired: false,
  isAuthenticating: false,
  isLoading: false
};

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {        
      case UserActions.FETCH_USER_BEGIN: {
        return {
          ...initialState,
          isLoading: payload.isLoading
        };
      }
      case UserActions.FETCH_USER_FAILURE: {
          return {
              ...initialState,
              isFailed: payload.isFailed,
              errorMessage: payload.errorMessage
          }
      }
      case UserActions.FETCH_USER_SUCCESS: {
        return payload.user;
      }
      case UserActions.LOGIN_USER_BEGIN: {
        return {
          ...initialState,
          isAuthenticating: payload.isAuthenticating
        };
      }
      case UserActions.LOGIN_USER_FAILURE: {
        return {
            ...initialState,
            isFailed: payload.isFailed,
            errorMessage: payload.errorMessage
        }
      }
      case UserActions.LOGIN_USER_SUCCESS: {
        return {
          ...state,
          isFailed: false,
          isAuthenticating: false
        };
      }
      case UserActions.USER_LOGOUT: {
        return initialState;
      }
      default: return state;
  }
}