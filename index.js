import React from 'react';
import { Provider } from 'react-redux';
import Expo from 'expo';

import store from './src/store';
import App from './src/App';

Expo.registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
));
