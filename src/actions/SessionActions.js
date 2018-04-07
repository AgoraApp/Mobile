import { NavigationActions } from 'react-navigation';

import moment from 'moment';

export const OPEN_SESSION = '@@SESSION/OPEN_SESSION';
export const CLOSE_SESSION = '@@SESSION/CLOSE_SESSION';
export const SET_ZONE = '@@SESSION/SET_ZONE';
export const SET_DURATION = '@@SESSION/SET_DURATION';
export const START_SESSION = '@@SESSION/START_SESSION';

export const openSession = placeId => (dispatch) => {
  dispatch(NavigationActions.navigate({ routeName: 'Session' }));

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

export const startSession = () => (dispatch) => {
  const startTime = moment();

  dispatch({
    type: START_SESSION,
    payload: startTime,
  });
};
