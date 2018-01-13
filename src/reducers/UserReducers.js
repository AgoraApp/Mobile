import {
  SET_TOKEN,
  VERIFY_USER__SUCCESS,
  VERIFY_USER__FAIL,
  FETCH_LOGIN,
  FETCH_LOGIN__SUCCESS,
  FETCH_LOGIN__FAIL,
} from './../actions/UserActions';

const initialState = {
  isLogged: false,
  isLoading: false,
  name: '',
  skills: [],
  token: '',
};

export default function userState(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
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

    case FETCH_LOGIN:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_LOGIN__SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
      };

    case FETCH_LOGIN__FAIL:
      return {
        ...state,
        token: '',
        isLoading: false,
      };

    default:
      return state;
  }
}
