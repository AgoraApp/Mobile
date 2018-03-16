import moment from 'moment';

export const SET_DURATION = '@@SESSION/SET_DURATION';
export const START_SESSION = '@@SESSION/START_SESSION';

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
