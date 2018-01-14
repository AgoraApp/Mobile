import { ProfileNavigator } from './../navigation/ProfileNavigation';

export default function profileNavigationState(state, action) {
  const nextState = ProfileNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
