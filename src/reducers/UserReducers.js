import {
  SET_TOKEN,
  SET_USER_LOCATION,
  VERIFY_USER__SUCCESS,
  VERIFY_USER__FAIL,
  FETCH_ME__SUCCESS,
  FETCH_LOGIN,
  FETCH_LOGIN__SUCCESS,
  FETCH_LOGIN__FAIL,
  FETCH_REGISTER,
  FETCH_REGISTER__SUCCESS,
  FETCH_REGISTER__FAIL,
  RESET_ERRORS,
  FETCH_LOGOUT__SUCCESS,
  FETCH_UPDATE_USER,
  FETCH_UPDATE_USER__SUCCESS,
  FETCH_UPDATE_USER__FAIL,
  FETCH_ADD_SKILL__SUCCESS,
  FETCH_REMOVE_SKILL__SUCCESS,
  FETCH_ADD_FAVOURITE_PLACE__SUCCESS,
  FETCH_REMOVE_FAVOURITE_PLACE__SUCCESS,
} from './../actions/UserActions';

const initialState = {
  isLogged: false,
  isLoading: false,
  errors: null,
  firstName: '',
  lastName: '',
  avatar: '',
  expertise: '',
  position: {},
  skills: [],
  favourites: [],
  token: '',
};

export default function userState(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_USER_LOCATION:
      return {
        ...state,
        position: action.payload,
      };

    case VERIFY_USER__SUCCESS:
      return {
        ...state,
        isLogged: true,
      };

    case VERIFY_USER__FAIL:
      return {
        ...state,
        token: '',
      };

    case FETCH_ME__SUCCESS:
      return {
        ...state,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        avatar: action.payload.avatar,
        expertise: action.payload.expertise,
        skills: action.payload.skills,
        favourites: action.payload.favourite_places,
      };

    case FETCH_LOGIN:
      return {
        ...state,
        isLoading: true,
        errors: null,
      };

    case FETCH_LOGIN__SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        token: action.payload.token,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
        avatar: action.payload.user.avatar,
        expertise: action.payload.user.expertise,
        skills: action.payload.user.skills,
        favourites: action.payload.user.favourite_places,
      };

    case FETCH_LOGIN__FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case FETCH_REGISTER:
      return {
        ...state,
        isLoading: true,
        errors: null,
      };

    case FETCH_REGISTER__SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        token: action.payload.token,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
      };

    case FETCH_REGISTER__FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case RESET_ERRORS:
      return {
        ...state,
        errors: null,
      };

    case FETCH_LOGOUT__SUCCESS:
      return {
        ...state,
        isLogged: false,
        token: '',
        firstName: '',
        lastName: '',
        avatar: '',
        expertise: '',
        skills: [],
      };

    case FETCH_UPDATE_USER:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_UPDATE_USER__SUCCESS:
      return {
        ...state,
        isLoading: false,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        avatar: action.payload.avatar,
        expertise: action.payload.expertise,
      };

    case FETCH_UPDATE_USER__FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_ADD_SKILL__SUCCESS:
      return {
        ...state,
        skills: action.payload,
      };

    case FETCH_REMOVE_SKILL__SUCCESS:
      return {
        ...state,
        skills: action.payload,
      };

    case FETCH_ADD_FAVOURITE_PLACE__SUCCESS:
      return {
        ...state,
        favourites: action.payload,
      };

    case FETCH_REMOVE_FAVOURITE_PLACE__SUCCESS:
      return {
        ...state,
        favourites: action.payload,
      };

    default:
      return state;
  }
}
