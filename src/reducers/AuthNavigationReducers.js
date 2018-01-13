import { AuthNavigator } from './../navigation/AuthNavigation';

export default function authNavigationState(state, action) {
  const nextState = AuthNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
