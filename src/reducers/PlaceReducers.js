import {
  FETCH_NEARBY_PLACES,
  FETCH_NEARBY_PLACES__SUCCESS,
  FETCH_NEARBY_PLACES__FAIL,
  SET_FOCUSED_PLACE,
  SET_EXPANDED_PLACE,
} from './../actions/PlaceActions';

const initialState = {
  isLoading: false,
  places: [],
  focusedPlaceId: null,
  expandedPlaceId: null,
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

    case SET_FOCUSED_PLACE:
      return {
        ...state,
        focusedPlaceId: action.payload,
      };

    case SET_EXPANDED_PLACE:
      return {
        ...state,
        expandedPlaceId: action.payload,
      };

    default:
      return state;
  }
}
