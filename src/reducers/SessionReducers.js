import {
  OPEN_SESSION,
  CLOSE_SESSION,
  SET_ZONE,
  SET_DURATION,
  SET_SESSION,
  CREATE_SESSION,
  CREATE_SESSION__SUCCESS,
  CREATE_SESSION__FAIL,
} from './../actions/SessionActions';

const initialState = {
  loading: false,
  duration: 3600,
  placeId: null,
  zoneId: null,
  currentSession: null,
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

    case SET_SESSION:
      return {
        ...state,
        currentSession: action.payload,
      };

    case CREATE_SESSION:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SESSION__SUCCESS:
      return {
        ...state,
        loading: false,
        currentSession: action.payload,
      };

    case CREATE_SESSION__FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
