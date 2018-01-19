export const SET_REGION = '@@MAP/SET_REGION';

export const setRegion = (latitude, longitude) => (dispatch) => {
  dispatch({
    type: SET_REGION,
    payload: { latitude, longitude },
  });
};
