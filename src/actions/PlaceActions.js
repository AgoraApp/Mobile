import { API_BASE_URL } from './../config/api';

import { SET_REGION } from './MapActions';

export const FETCH_PLACE = '@@PLACE/FETCH_PLACE';
export const FETCH_PLACE__SUCCESS = '@@PLACE/FETCH_PLACE__SUCCESS';
export const FETCH_PLACE__FAIL = '@@PLACE/FETCH_PLACE_FAIL';

export const FETCH_PLACE_SESSIONS = '@@PLACE/FETCH_PLACE_SESSIONS';
export const FETCH_PLACE_SESSIONS__SUCCESS = '@@PLACE/FETCH_PLACE_SESSIONS__SUCCESS';
export const FETCH_PLACE_SESSIONS__FAIL = '@@PLACE/FETCH_PLACE_SESSIONS_FAIL';

export const FETCH_NEARBY_PLACES = '@@PLACE/FETCH_NEARBY_PLACES';
export const FETCH_NEARBY_PLACES__SUCCESS = '@@PLACE/FETCH_NEARBY_PLACES__SUCCESS';
export const FETCH_NEARBY_PLACES__FAIL = '@@PLACE/FETCH_NEARBY_PLACES_FAIL';

export const FETCH_FAVOURITE_PLACES = '@@PLACE/FETCH_FAVOURITE_PLACES';
export const FETCH_FAVOURITE_PLACES__SUCCESS = '@@PLACE/FETCH_FAVOURITE_PLACES__SUCCESS';
export const FETCH_FAVOURITE_PLACES__FAIL = '@@PLACE/FETCH_FAVOURITE_PLACES_FAIL';

export const SET_MAP_FOCUSED_PLACE = '@@PLACE/SET_MAP_FOCUSED_PLACE';
export const SET_MAP_EXPANDED_PLACE = '@@PLACE/SET_MAP_EXPANDED_PLACE';

export const SET_FAVOURITE_EXPANDED_PLACE = '@@PLACE/SET_FAVOURITE_EXPANDED_PLACE';

export const fetchPlace = id => (dispatch) => {
  dispatch({ type: FETCH_PLACE });

  fetch(`${API_BASE_URL}/places/${id}`)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_PLACE__SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PLACE__FAIL,
        payload: error,
      });
    });
};

export const fetchPlaceSessions = id => (dispatch) => {
  dispatch({ type: FETCH_PLACE_SESSIONS });

  fetch(`${API_BASE_URL}/sessions/find/place/${id}`)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_PLACE_SESSIONS__SUCCESS,
        payload: { id, sessions: data },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PLACE_SESSIONS__FAIL,
        payload: error,
      });
    });
};

export const fetchNearyPlaces = (latitude, longitude) => (dispatch) => {
  dispatch({ type: FETCH_NEARBY_PLACES });

  fetch(`${API_BASE_URL}/places/find/nearby?latitude=${latitude}&longitude=${longitude}`)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_NEARBY_PLACES__SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_NEARBY_PLACES__FAIL,
        payload: error,
      });
    });
};

export const fetchFavouritePlaces = () => (dispatch) => {
  dispatch({ type: FETCH_FAVOURITE_PLACES });

  fetch(`${API_BASE_URL}/me/places/favourite`)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_FAVOURITE_PLACES__SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_FAVOURITE_PLACES__FAIL,
        payload: error,
      });
    });
};

export const focusMapPlace = place => (dispatch) => {
  dispatch({
    type: SET_MAP_FOCUSED_PLACE,
    payload: place.id,
  });

  if (place.latitude && place.longitude) {
    dispatch({
      type: SET_REGION,
      payload: { latitude: place.latitude - 0.005, longitude: place.longitude },
    });
  }
};

export const expandMapPlace = place => (dispatch) => {
  dispatch({
    type: SET_MAP_EXPANDED_PLACE,
    payload: place.id,
  });
};

export const expandFavouritePlace = placeId => (dispatch) => {
  dispatch({
    type: SET_FAVOURITE_EXPANDED_PLACE,
    payload: placeId,
  });
};
