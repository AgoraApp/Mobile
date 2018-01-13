import { SET_TOKEN } from './../actions/UserActions';

const initialState = {
  isLogged: false,
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

    default:
      return state;
  }
}
