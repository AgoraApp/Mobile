import { combineReducers } from 'redux';

import userState from './UserReducers';

const state = combineReducers({
  user: userState,
});

export default state;
