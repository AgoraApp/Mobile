import { AsyncStorage } from 'react-native';
import fetchIntercept from 'fetch-intercept';

import store from './../store';
import { SET_TOKEN } from './../actions/UserActions';

const unregister = fetchIntercept.register({
  request: (url, config) => {
    console.log('FETCH REQUEST', url);
    let copyConfig = config;
    const { user: { token } } = store.getState();

    if (token) {
      copyConfig = {
        ...config,
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      };
    }

    return [url, copyConfig];
  },

  response: (response) => {
    if (response.status === 200) {
      if (response.headers.has('Authorization')) {
        const token = response.headers.get('Authorization').split(' ')[1];

        AsyncStorage.setItem('@AgoraStore:authToken', token);

        store.dispatch({
          type: SET_TOKEN,
          payload: token,
        });
      }

      return response;
    }

    throw new Error(response.statusText);
  },
});

export default unregister;
