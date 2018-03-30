import { API_BASE_URL } from './../config/api';

import { SET_REGION } from './MapActions';

export const FETCH_NEARBY_PLACES = '@@PLACE/FETCH_NEARBY_PLACES';
export const FETCH_NEARBY_PLACES__SUCCESS = '@@PLACE/FETCH_NEARBY_PLACES__SUCCESS';
export const FETCH_NEARBY_PLACES__FAIL = '@@PLACE/FETCH_NEARBY_PLACES_FAIL';

export const FETCH_FAVOURITE_PLACES = '@@PLACE/FETCH_FAVOURITE_PLACES';
export const FETCH_FAVOURITE_PLACES__SUCCESS = '@@PLACE/FETCH_FAVOURITE_PLACES__SUCCESS';
export const FETCH_FAVOURITE_PLACES__FAIL = '@@PLACE/FETCH_FAVOURITE_PLACES_FAIL';

export const SET_FOCUSED_PLACE = '@@PLACE/SET_FOCUSED_PLACE';
export const SET_EXPANDED_PLACE = '@@PLACE/SET_EXPANDED_PLACE';

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

export const focusPlace = place => (dispatch) => {
  dispatch({
    type: SET_FOCUSED_PLACE,
    payload: place.id,
  });

  if (place.latitude && place.longitude) {
    dispatch({
      type: SET_REGION,
      payload: { latitude: place.latitude - 0.005, longitude: place.longitude },
    });
  }
};

export const expandPlace = place => (dispatch) => {
  dispatch({
    type: SET_EXPANDED_PLACE,
    payload: place.id,
  });
};
