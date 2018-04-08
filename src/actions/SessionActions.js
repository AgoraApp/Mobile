import { API_BASE_URL } from './../config/api';

export const OPEN_SESSION = '@@SESSION/OPEN_SESSION';
export const CLOSE_SESSION = '@@SESSION/CLOSE_SESSION';
export const SET_ZONE = '@@SESSION/SET_ZONE';
export const SET_DURATION = '@@SESSION/SET_DURATION';

export const SET_SESSION = '@@SESSION/SET_SESSION';

export const CREATE_SESSION = '@@SESSION/CREATE_SESSION';
export const CREATE_SESSION__SUCCESS = '@@SESSION/CREATE_SESSION__SUCCESS';
export const CREATE_SESSION__FAIL = '@@SESSION/CREATE_SESSION__FAIL';

export const openSession = placeId => (dispatch) => {
  dispatch({
    type: OPEN_SESSION,
    payload: placeId,
  });
};

export const closeSession = () => (dispatch) => {
  dispatch({
    type: CLOSE_SESSION,
  });
};

export const setZone = zoneId => (dispatch) => {
  dispatch({
    type: SET_ZONE,
    payload: zoneId,
  });
};

export const setDuration = value => (dispatch) => {
  dispatch({
    type: SET_DURATION,
    payload: value,
  });
};

export const setSession = session => (dispatch) => {
  dispatch({
    type: SET_SESSION,
    payload: session,
  });
};

export const createSession = (placeId, zoneId, duration) => (dispatch) => {
  dispatch({ type: CREATE_SESSION });

  const formData = new FormData();
  formData.append('place_id', placeId);
  formData.append('zone_id', zoneId);
  formData.append('duration', duration);

  fetch(`${API_BASE_URL}/me/sessions`, { method: 'POST', body: formData })
    .then(response => response.json())
    .then((data) => {
      dispatch([
        {
          type: CREATE_SESSION__SUCCESS,
          payload: data,
        },
        closeSession(),
      ]);
    })
    .catch((error) => {
      dispatch({
        type: CREATE_SESSION__FAIL,
        payload: error,
      });
    });
};
