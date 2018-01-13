import { combineReducers } from 'redux';

import appState from './AppReducers';
import rootNavigationState from './RootNavigationReducers';
import userState from './UserReducers';

const state = combineReducers({
  app: appState,
  rootNavigation: rootNavigationState,
  user: userState,
});

export default state;
