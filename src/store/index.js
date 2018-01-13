import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';

import indexReducer from './../reducers';

const store = createStore(indexReducer, composeWithDevTools(
  applyMiddleware(thunk, multi),
));

export default store;
