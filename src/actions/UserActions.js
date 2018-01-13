import { AsyncStorage } from 'react-native';

import { API_BASE_URL } from './../config/api';

import { APP_IS_LOADED } from './AppActions';

export const VERIFY_USER = '@@USER/VERIFY_USER';
export const VERIFY_USER__SUCCESS = '@@USER/VERIFY_USER__SUCCESS';
export const VERIFY_USER__FAIL = '@@USER/VERIFY_USER__FAIL';
export const SET_TOKEN = '@@USER/SET_TOKEN';
export const FETCH_LOGIN = '@@USER/FETCH_LOGIN';
export const FETCH_LOGIN__SUCCESS = '@@USER/FETCH_LOGIN__SUCCESS';
export const FETCH_LOGIN__FAIL = '@@USER/FETCH_LOGIN__FAIL';

export const verifyUser = () => (dispatch) => {
  dispatch({ type: VERIFY_USER });

  AsyncStorage.getItem('@AgoraStore:authToken').then((token) => {
    if (token) {
      AsyncStorage.setItem('@AgoraStore:authToken', token);

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
        })
        .catch((error) => {
          AsyncStorage.setItem('@AgoraStore:authToken', '');

          dispatch({
            type: VERIFY_USER__FAIL,
            payload: error,
          });
        })
        .then(() => {
          dispatch({ type: APP_IS_LOADED });
        });
    } else {
      dispatch([
        {
          type: VERIFY_USER__FAIL,
        },
        {
          type: APP_IS_LOADED,
        },
      ]);
    }
  });
};

export const login = (email, password) => (dispatch) => {
  dispatch({ type: FETCH_LOGIN });

  const formData = new FormData();

  formData.append('email', email);
  formData.append('password', password);

  fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then((data) => {
      AsyncStorage.setItem('@AgoraStore:authToken', data.token);

      dispatch({
        type: FETCH_LOGIN__SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_LOGIN__FAIL,
        payload: error,
      });
    });
};
