import { API_BASE_URL } from './../config/api';

export const FETCH_NEARBY_PLACES = '@@PLACE/FETCH_NEARBY_PLACES';
export const FETCH_NEARBY_PLACES__SUCCESS = '@@PLACE/FETCH_NEARBY_PLACES__SUCCESS';
export const FETCH_NEARBY_PLACES__FAIL = '@@PLACE/FETCH_LNEARBY_PLACES_FAIL';

export const fetchNearyPlaces = (latitude, longitude) => (dispatch) => {
  dispatch({ type: FETCH_NEARBY_PLACES });

  fetch(`${API_BASE_URL}/places/nearby?latitude=${latitude}&longitude=${longitude}`)
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
