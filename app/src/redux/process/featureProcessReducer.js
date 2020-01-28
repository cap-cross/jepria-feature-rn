import * as actions from './featureProcessActions.js';

const initialState = {
  isLoading: false,
  items: []
}

export default function history(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {        
        case actions.FETCH_PROCESS_BEGIN: {
          return {
            isLoading: true,
            items: []
          }
        }
        case actions.FETCH_PROCESS_FAILURE: {
            return {
                isLoading: false,
                isFailed: payload.isFailed,
                errorMessage: payload.errorMessage,
                items: []
            }
        }
        case actions.FETCH_PROCESS_SUCCESS: {
          return {
            isLoading: false,
            items: payload.history
          }
        }
        default: return state;
    }
}