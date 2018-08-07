import * as actions from './historyActions.js';

const initialState = {
  items: []
}

export default function history(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {        
        case actions.FETCH_HISTORY_BEGIN: {
          return {
            isLoading: payload.isLoading,
            items: []
          }
        }
        case actions.FETCH_HISTORY_FAILURE: {
            return {
                isFailed: payload.isFailed,
                errorMessage: payload.errorMessage,
                items: []
            }
        }
        case actions.FETCH_HISTORY_SUCCESS: {
          return {
            items: payload.history
          }
        }
        default: return state;
    }
}