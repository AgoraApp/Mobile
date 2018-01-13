import { RootNavigator } from './../navigation/RootNavigation';

export default function rootNavigationState(state, action) {
  const nextState = RootNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
