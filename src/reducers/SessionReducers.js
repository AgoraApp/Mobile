import {
  OPEN_SESSION,
  CLOSE_SESSION,
  SET_ZONE,
  SET_DURATION,
  SET_SESSION,
  CREATE_SESSION,
  CREATE_SESSION__SUCCESS,
  CREATE_SESSION__FAIL,
  STOP_SESSION,
  STOP_SESSION__SUCCESS,
  STOP_SESSION__FAIL,
  REMOVE_CURRENT_SESSION,
} from './../actions/SessionActions';

const START_DURATION = 3600;

const initialState = {
  loading: false,
  duration: START_DURATION,
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
        duration: START_DURATION,
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

    case STOP_SESSION:
      return {
        ...state,
        loading: true,
      };

    case STOP_SESSION__SUCCESS:
      return {
        ...state,
        loading: false,
        currentSession: null,
      };

    case STOP_SESSION__FAIL:
      return {
        ...state,
        loading: false,
      };

    case REMOVE_CURRENT_SESSION:
      return {
        ...state,
        currentSession: null,
      };

    default:
      return state;
  }
}
