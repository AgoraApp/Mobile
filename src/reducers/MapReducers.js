import {
  SET_REGION,
} from './../actions/MapActions';
import {
  FETCH_LOGOUT__SUCCESS,
} from './../actions/UserActions';

const initialState = {
  region: {},
};

export default function mapState(state = initialState, action) {
  switch (action.type) {
    case SET_REGION:
      return {
        ...state,
        region: action.payload,
      };

    case FETCH_LOGOUT__SUCCESS:
      return initialState;

    default:
      return state;
  }
}
