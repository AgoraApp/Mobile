import { combineReducers } from 'redux';

import rootNavigationState from './RootNavigationReducers';
import rootTabNavigationState from './RootTabNavigationReducers';
import authNavigationState from './AuthNavigationReducers';
import profileNavigationState from './ProfileNavigationReducers';
import userState from './UserReducers';
import mapState from './MapReducers';
import placeState from './PlaceReducers';
import skillState from './SkillReducers';
import profileState from './ProfileReducers';
import sessionState from './SessionReducers';

const state = combineReducers({
  rootNavigation: rootNavigationState,
  rootTabNavigation: rootTabNavigationState,
  authNavigation: authNavigationState,
  profileNavigation: profileNavigationState,
  user: userState,
  map: mapState,
  place: placeState,
  skill: skillState,
  profile: profileState,
  session: sessionState,
});

export default state;
