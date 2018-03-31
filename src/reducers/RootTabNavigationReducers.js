import { RootTabNavigator } from './../navigation/RootTabNavigation';

export default function rootTabNavigationState(state, action) {
  const nextState = RootTabNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
