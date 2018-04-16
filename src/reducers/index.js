import { combineReducers } from 'redux';

import rootTabNavigationState from './RootTabNavigationReducers';
import profileNavigationState from './ProfileNavigationReducers';
import userState from './UserReducers';
import mapState from './MapReducers';
import placeState from './PlaceReducers';
import skillState from './SkillReducers';
import profileState from './ProfileReducers';
import sessionState from './SessionReducers';

const state = combineReducers({
  rootTabNavigation: rootTabNavigationState,
  profileNavigation: profileNavigationState,
  user: userState,
  map: mapState,
  place: placeState,
  skill: skillState,
  profile: profileState,
  session: sessionState,
});

export default state;
