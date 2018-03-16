import {
  SET_DURATION,
  START_SESSION,
} from './../actions/SessionActions';

const initialState = {
  start: null,
  duration: 3600,
};

export default function skillState(state = initialState, action) {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };

    case START_SESSION:
      return {
        ...state,
        start: action.payload,
      };

    default:
      return state;
  }
}
