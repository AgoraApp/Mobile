import {
  OPEN_CREATE_SESSION,
  CLOSE_CREATE_SESSION,
  OPEN_UPDATE_ZONE,
  CLOSE_UPDATE_ZONE,
  OPEN_UPDATE_DURATION,
  CLOSE_UPDATE_DURATION,
  SET_ZONE,
  SET_DURATION,
  SET_SESSION,
  FETCH_SESSIONS,
  FETCH_SESSIONS__SUCCESS,
  FETCH_SESSIONS__FAIL,
  CREATE_SESSION,
  CREATE_SESSION__SUCCESS,
  CREATE_SESSION__FAIL,
  STOP_SESSION,
  STOP_SESSION__SUCCESS,
  STOP_SESSION__FAIL,
  REMOVE_CURRENT_SESSION,
  UPDATE_SESSION,
  UPDATE_SESSION__SUCCESS,
  UPDATE_SESSION__FAIL,
} from './../actions/SessionActions';

const START_DURATION = 3600;

const initialState = {
  showCreate: false,
  showUpdateZone: false,
  showUpdateDuration: false,
  loading: false,
  isSessionsLoading: false,
  duration: START_DURATION,
  placeId: null,
  zoneId: null,
  currentSession: null,
  sessions: [],
};

export default function skillState(state = initialState, action) {
  switch (action.type) {
    case OPEN_CREATE_SESSION:
      return {
        ...state,
        showCreate: true,
        placeId: action.payload,
      };

    case CLOSE_CREATE_SESSION:
      return {
        ...state,
        showCreate: false,
        duration: START_DURATION,
        placeId: null,
        zoneId: null,
      };

    case OPEN_UPDATE_ZONE:
      return {
        ...state,
        showUpdateZone: true,
        zoneId: action.payload,
      };

    case CLOSE_UPDATE_ZONE:
      return {
        ...state,
        showUpdateZone: false,
        zoneId: null,
      };

    case OPEN_UPDATE_DURATION:
      return {
        ...state,
        showUpdateDuration: true,
        duration: action.payload,
      };

    case CLOSE_UPDATE_DURATION:
      return {
        ...state,
        showUpdateDuration: false,
        duration: START_DURATION,
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

    case FETCH_SESSIONS:
      return {
        ...state,
        isSessionsLoading: true,
      };

    case FETCH_SESSIONS__SUCCESS:
      return {
        ...state,
        isSessionsLoading: false,
        sessions: action.payload,
      };

    case FETCH_SESSIONS__FAIL:
      return {
        ...state,
        isSessionsLoading: false,
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

    case UPDATE_SESSION:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SESSION__SUCCESS:
      return {
        ...state,
        loading: false,
        currentSession: action.payload,
      };

    case UPDATE_SESSION__FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
