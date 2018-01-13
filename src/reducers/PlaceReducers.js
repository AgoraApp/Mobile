import {
  FETCH_NEARBY_PLACES,
  FETCH_NEARBY_PLACES__SUCCESS,
  FETCH_NEARBY_PLACES__FAIL,
} from './../actions/PlaceActions';

const initialState = {
  isLoading: false,
  places: [],
};

export default function placeState(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEARBY_PLACES:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_NEARBY_PLACES__SUCCESS:
      return {
        ...state,
        isLoading: false,
        places: action.payload,
      };

    case FETCH_NEARBY_PLACES__FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
