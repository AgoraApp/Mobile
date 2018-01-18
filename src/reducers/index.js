import { combineReducers } from 'redux';

import rootNavigationState from './RootNavigationReducers';
import authNavigationState from './AuthNavigationReducers';
import profileNavigationState from './ProfileNavigationReducers';
import userState from './UserReducers';
import placeState from './PlaceReducers';
import skillState from './SkillReducers';

const state = combineReducers({
  rootNavigation: rootNavigationState,
  authNavigation: authNavigationState,
  profileNavigation: profileNavigationState,
  user: userState,
  place: placeState,
  skill: skillState,
});

export default state;
