import { AsyncStorage } from 'react-native';

import { API_BASE_URL } from './../config/api';

import { APP_IS_LOADED } from './AppActions';

export const VERIFY_USER = '@@USER/VERIFY_USER';
export const VERIFY_USER__SUCCESS = '@@USER/VERIFY_USER__SUCCESS';
export const VERIFY_USER__FAIL = '@@USER/VERIFY_USER__FAIL';
export const SET_TOKEN = '@@USER/SET_TOKEN';

export const verifyUser = () => (dispatch) => {
  dispatch({
    type: VERIFY_USER,
  });

  AsyncStorage.getItem('@AgoraStore:authToken').then((token) => {
    if (token) {
      dispatch({
        type: SET_TOKEN,
        payload: token,
      });

      fetch(`${API_BASE_URL}/refresh`)
        .then(response => response.json())
        .then((data) => {
          dispatch({
            type: VERIFY_USER__SUCCESS,
            payload: data,
          });
        });
    } else {
      dispatch({
        type: VERIFY_USER__FAIL,
      });
    }
  });

  dispatch({ type: APP_IS_LOADED });
};
