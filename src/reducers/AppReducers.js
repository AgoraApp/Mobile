import { APP_IS_LOADED } from './../actions/AppActions';

const initialState = {
  isLoaded: false,
};

export default function appState(state = initialState, action) {
  switch (action.type) {
    case APP_IS_LOADED:
      return {
        ...state,
        isLoaded: true,
      };

    default:
      return state;
  }
}
