import { combineReducers } from 'redux';

import rootNavigationState from './RootNavigationReducers';
import authNavigationState from './AuthNavigationReducers';
import profileNavigationState from './ProfileNavigationReducers';
import userState from './UserReducers';
import mapState from './MapReducers';
import placeState from './PlaceReducers';
import skillState from './SkillReducers';

const state = combineReducers({
  rootNavigation: rootNavigationState,
  authNavigation: authNavigationState,
  profileNavigation: profileNavigationState,
  user: userState,
  map: mapState,
  place: placeState,
  skill: skillState,
});

export default state;
