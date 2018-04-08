import { AsyncStorage } from 'react-native';
import fetchIntercept from 'fetch-intercept';

import store from './../store';
import { SET_TOKEN } from './../actions/UserActions';

const unregister = fetchIntercept.register({
  request: (url, config) => {
    let copyConfig = config;
    const { user: { token } } = store.getState();

    if (token) {
      const headers = config && config.headers ? config.headers : {};

      copyConfig = {
        ...config,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    console.log('FETCH REQUEST', url, copyConfig);

    return [url, copyConfig];
  },

  response: (response) => {
    console.log('FETCH RESPONSE', response);
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
