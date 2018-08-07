import * as UserActions from './userActions';

const initialState = {
  userName: "",
  operatorId: "",
  userRoles: [],
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
      case UserActions.USER_LOGOUT: {
        return initialState;
      }
      default: return state;
  }
}