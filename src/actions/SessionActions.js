import moment from 'moment';

import { API_BASE_URL } from './../config/api';

export const OPEN_VIEW_SESSIONS = '@@SESSION/OPEN_VIEW_SESSIONS';
export const CLOSE_VIEW_SESSIONS = '@@SESSION/CLOSE_VIEW_SESSIONS';

export const OPEN_CREATE_SESSION = '@@SESSION/OPEN_CREATE_SESSION';
export const CLOSE_CREATE_SESSION = '@@SESSION/CLOSE_CREATE_SESSION';

export const OPEN_UPDATE_ZONE = '@@SESSION/OPEN_UPDATE_ZONE';
export const CLOSE_UPDATE_ZONE = '@@SESSION/CLOSE_UPDATE_ZONE';

export const OPEN_UPDATE_DURATION = '@@SESSION/OPEN_UPDATE_DURATION';
export const CLOSE_UPDATE_DURATION = '@@SESSION/CLOSE_UPDATE_DURATION';

export const SET_ZONE = '@@SESSION/SET_ZONE';
export const SET_DURATION = '@@SESSION/SET_DURATION';

export const SET_SESSION = '@@SESSION/SET_SESSION';

export const FETCH_SESSIONS = '@@SESSION/FETCH_SESSIONS';
export const FETCH_SESSIONS__SUCCESS = '@@SESSION/FETCH_SESSIONS__SUCCESS';
export const FETCH_SESSIONS__FAIL = '@@SESSION/FETCH_SESSIONS__FAIL';

export const CREATE_SESSION = '@@SESSION/CREATE_SESSION';
export const CREATE_SESSION__SUCCESS = '@@SESSION/CREATE_SESSION__SUCCESS';
export const CREATE_SESSION__FAIL = '@@SESSION/CREATE_SESSION__FAIL';

export const STOP_SESSION = '@@SESSION/STOP_SESSION';
export const STOP_SESSION__SUCCESS = '@@SESSION/STOP_SESSION__SUCCESS';
export const STOP_SESSION__FAIL = '@@SESSION/STOP_SESSION__FAIL';

export const REMOVE_CURRENT_SESSION = '@@SESSION/REMOVE_CURRENT_SESSION';

export const UPDATE_SESSION = '@@SESSION/UPDATE_SESSION';
export const UPDATE_SESSION__SUCCESS = '@@SESSION/UPDATE_SESSION__SUCCESS';
export const UPDATE_SESSION__FAIL = '@@SESSION/UPDATE_SESSION__FAIL';

export const openViewSessions = placeId => (dispatch) => {
  dispatch({
    type: OPEN_VIEW_SESSIONS,
    payload: placeId,
  });
};

export const closeViewSessions = () => (dispatch) => {
  dispatch({
    type: CLOSE_VIEW_SESSIONS,
  });
};

export const openCreateSession = placeId => (dispatch) => {
  dispatch({
    type: OPEN_CREATE_SESSION,
    payload: placeId,
  });
};

export const closeCreateSession = () => (dispatch) => {
  dispatch({
    type: CLOSE_CREATE_SESSION,
  });
};

export const openUpdateZone = zoneId => (dispatch) => {
  dispatch({
    type: OPEN_UPDATE_ZONE,
    payload: zoneId,
  });
};

export const closeUpdateZone = () => (dispatch) => {
  dispatch({
    type: CLOSE_UPDATE_ZONE,
  });
};

export const openUpdateDuration = duration => (dispatch) => {
  dispatch({
    type: OPEN_UPDATE_DURATION,
    payload: duration,
  });
};

export const closeUpdateDuration = () => (dispatch) => {
  dispatch({
    type: CLOSE_UPDATE_DURATION,
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

export const fetchSessions = () => (dispatch) => {
  dispatch({ type: FETCH_SESSIONS });

  fetch(`${API_BASE_URL}/me/sessions`)
    .then(response => response.json())
    .then((data) => {
      dispatch([
        {
          type: FETCH_SESSIONS__SUCCESS,
          payload: data,
        },
      ]);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SESSIONS__FAIL,
        payload: error,
      });
    });
};

export const createSession = (placeId, zoneId, duration) => (dispatch) => {
  dispatch({ type: CREATE_SESSION });

  const formData = new FormData();
  formData.append('place_id', placeId);
  formData.append('zone_id', zoneId);
  formData.append('duration', duration);

  return fetch(`${API_BASE_URL}/me/sessions`, { method: 'POST', body: formData })
    .then(response => response.json())
    .then((data) => {
      dispatch([
        {
          type: CREATE_SESSION__SUCCESS,
          payload: data,
        },
        fetchSessions(),
      ]);
    })
    .catch((error) => {
      dispatch({
        type: CREATE_SESSION__FAIL,
        payload: error,
      });
    });
};

export const stopSession = sessionId => (dispatch) => {
  dispatch({ type: STOP_SESSION });

  fetch(`${API_BASE_URL}/me/sessions/${sessionId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => {
      dispatch([
        { type: STOP_SESSION__SUCCESS },
        fetchSessions(),
      ]);
    })
    .catch((error) => {
      dispatch({
        type: STOP_SESSION__FAIL,
        payload: error,
      });
    });
};

export const removeCurrentSessions = () => (dispatch) => {
  dispatch({ type: REMOVE_CURRENT_SESSION });
};

export const updateZone = (sessionId, zoneId) => (dispatch) => {
  dispatch({ type: UPDATE_SESSION });

  return fetch(`${API_BASE_URL}/me/sessions/${sessionId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ zone_id: zoneId }) })
    .then(response => response.json())
    .then((data) => {
      dispatch([
        {
          type: UPDATE_SESSION__SUCCESS,
          payload: data,
        },
        fetchSessions(),
      ]);
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_SESSION__FAIL,
        payload: error,
      });
    });
};

export const updateDuration = (sessionId, duration) => (dispatch) => {
  dispatch({ type: UPDATE_SESSION });

  const end = moment().add(duration, 'seconds').format('YYYY-MM-DD HH:mm:ss');

  return fetch(`${API_BASE_URL}/me/sessions/${sessionId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ end_at: end }) })
    .then(response => response.json())
    .then((data) => {
      dispatch([
        {
          type: UPDATE_SESSION__SUCCESS,
          payload: data,
        },
        fetchSessions(),
      ]);
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_SESSION__FAIL,
        payload: error,
      });
    });
};
