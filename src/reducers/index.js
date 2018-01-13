import { combineReducers } from 'redux';

import rootNavigationState from './RootNavigationReducers';
import userState from './UserReducers';

const state = combineReducers({
  rootNavigation: rootNavigationState,
  user: userState,
});

export default state;
