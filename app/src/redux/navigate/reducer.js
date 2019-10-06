import {RootNavigator } from '../../config/navigation';

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('AuthLoading'));

export default function reducer(state = initialState, action) {
  const newState = RootNavigator.router.getStateForAction(action, state);
  return newState || state;
}
