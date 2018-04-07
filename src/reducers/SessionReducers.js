import {
  OPEN_SESSION,
  CLOSE_SESSION,
  SET_ZONE,
  SET_DURATION,
  START_SESSION,
} from './../actions/SessionActions';

const initialState = {
  start: null,
  duration: 3600,
  placeId: null,
};

export default function skillState(state = initialState, action) {
  switch (action.type) {
    case OPEN_SESSION:
      return {
        ...state,
        placeId: action.payload,
      };

    case CLOSE_SESSION:
      return {
        ...state,
        placeId: null,
        zoneId: null,
      };

    case SET_ZONE:
      return {
        ...state,
        zoneId: action.payload,
      };

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
