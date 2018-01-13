import { combineReducers } from 'redux';

import appState from './AppReducers';
import rootNavigationState from './RootNavigationReducers';
import authNavigationState from './AuthNavigationReducers';
import userState from './UserReducers';
import placeState from './PlaceReducers';

const state = combineReducers({
  app: appState,
  rootNavigation: rootNavigationState,
  authNavigation: authNavigationState,
  user: userState,
  place: placeState,
});

export default state;
