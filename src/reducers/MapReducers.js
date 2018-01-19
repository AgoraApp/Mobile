import {
  SET_REGION,
} from './../actions/MapActions';

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

    default:
      return state;
  }
}
