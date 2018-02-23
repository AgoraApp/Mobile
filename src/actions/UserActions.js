import { AsyncStorage, Image } from 'react-native';

import { API_BASE_URL } from './../config/api';

import { disableEditMode } from './ProfileActions';

export const VERIFY_TOKEN = '@@USER/VERIFY_TOKEN';
export const VERIFY_TOKEN__SUCCESS = '@@USER/VERIFY_TOKEN__SUCCESS';
export const VERIFY_TOKEN__FAIL = '@@USER/VERIFY_TOKEN__FAIL';
export const SET_TOKEN = '@@USER/SET_TOKEN';

export const VERIFY_USER = '@@USER/VERIFY_USER';
export const VERIFY_USER__SUCCESS = '@@USER/VERIFY_USER__SUCCESS';
export const VERIFY_USER__FAIL = '@@USER/VERIFY_USER__FAIL';

export const FETCH_ME = '@@USER/FETCH_ME';
export const FETCH_ME__SUCCESS = '@@USER/FETCH_ME__SUCCESS';
export const FETCH_ME__FAIL = '@@USER/FETCH_ME__FAIL';

export const FETCH_LOGIN = '@@USER/FETCH_LOGIN';
export const FETCH_LOGIN__SUCCESS = '@@USER/FETCH_LOGIN__SUCCESS';
export const FETCH_LOGIN__FAIL = '@@USER/FETCH_LOGIN__FAIL';

export const FETCH_LOGOUT = '@@USER/FETCH_LOGOUT';
export const FETCH_LOGOUT__SUCCESS = '@@USER/FETCH_LOGOUT__SUCCESS';
export const FETCH_LOGOUT__FAIL = '@@USER/FETCH_LOGOUT__FAIL';

export const FETCH_UPDATE_USER = '@@USER/FETCH_UPDATE_USER';
export const FETCH_UPDATE_USER__SUCCESS = '@@USER/FETCH_UPDATE_USER__SUCCESS';
export const FETCH_UPDATE_USER__FAIL = '@@USER/FETCH_UPDATE_USER__FAIL';

export const FETCH_ADD_SKILL = '@@USER/FETCH_ADD_SKILL';
export const FETCH_ADD_SKILL__SUCCESS = '@@USER/FETCH_ADD_SKILL__SUCCESS';
export const FETCH_ADD_SKILL__FAIL = '@@USER/FETCH_ADD_SKILL_FAIL';

export const FETCH_REMOVE_SKILL = '@@USER/FETCH_REMOVE_SKILL';
export const FETCH_REMOVE_SKILL__SUCCESS = '@@USER/FETCH_REMOVE_SKILL__SUCCESS';
export const FETCH_REMOVE_SKILL__FAIL = '@@USER/FETCH_REMOVE_SKILL__FAIL';

export const verifyUser = () => (dispatch) => {
  dispatch({ type: VERIFY_USER });

  return fetch(`${API_BASE_URL}/refresh`)
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
    });
};

export const verifyToken = () => (dispatch) => {
  dispatch({ type: VERIFY_TOKEN });

  return AsyncStorage.getItem('@AgoraStore:authToken').then((token) => {
    if (token) {
      dispatch([
        {
          type: VERIFY_TOKEN__SUCCESS,
        },
        {
          type: SET_TOKEN,
          payload: token,
        },
      ]);

      return Promise.resolve();
    }

    dispatch({ type: VERIFY_TOKEN__FAIL });

    return Promise.reject();
  });
};

export const fetchUserData = () => (dispatch) => {
  dispatch({ type: FETCH_ME });

  return fetch(`${API_BASE_URL}/me`)
    .then(response => response.json())
    .then((user) => {
      dispatch({
        type: FETCH_ME__SUCCESS,
        payload: user,
      });

      return Image.prefetch(user.avatar);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ME__FAIL,
        payload: error,
      });
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
      if (data.user.avatar.length > 0) {
        Image.prefetch(data.user.avatar);
      }

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

export const logout = () => (dispatch) => {
  dispatch({ type: FETCH_LOGOUT });

  fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' })
    .then(response => response.json())
    .then(() => {
      AsyncStorage.setItem('@AgoraStore:authToken', '');

      dispatch({ type: FETCH_LOGOUT__SUCCESS });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_LOGOUT__FAIL,
        payload: error,
      });
    });
};

export const updateUser = (firstName, lastName, expertise, avatar) => (dispatch) => {
  dispatch({ type: FETCH_UPDATE_USER });

  const formData = new FormData();
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('expertise', expertise);
  formData.append('avatar', {
    uri: avatar,
    type: 'image/jpeg',
    name: 'user-avatar',
  });

  fetch(`${API_BASE_URL}/me/update`, { method: 'POST', body: formData })
    .then(response => response.json())
    .then((data) => {
      dispatch([
        {
          type: FETCH_UPDATE_USER__SUCCESS,
          payload: data,
        },
        disableEditMode(),
      ]);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_UPDATE_USER__FAIL,
        payload: error,
      });
    });
};

export const addSkill = skill => (dispatch) => {
  dispatch({ type: FETCH_ADD_SKILL });

  fetch(`${API_BASE_URL}/me/skills/${skill}`, { method: 'POST' })
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_ADD_SKILL__SUCCESS,
        payload: data.user.skills,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ADD_SKILL__FAIL,
        payload: error,
      });
    });
};

export const removeSkill = skill => (dispatch) => {
  dispatch({ type: FETCH_REMOVE_SKILL });

  fetch(`${API_BASE_URL}/me/skills/${skill}`, { method: 'DELETE' })
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_REMOVE_SKILL__SUCCESS,
        payload: data.user.skills,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_REMOVE_SKILL__FAIL,
        payload: error,
      });
    });
};
