import {
  FETCH_NEARBY_PLACES,
  FETCH_NEARBY_PLACES__SUCCESS,
  FETCH_NEARBY_PLACES__FAIL,
  FETCH_FAVOURITE_PLACES,
  FETCH_FAVOURITE_PLACES__SUCCESS,
  FETCH_FAVOURITE_PLACES__FAIL,
  SET_MAP_FOCUSED_PLACE,
  SET_MAP_EXPANDED_PLACE,
  SET_FAVOURITE_EXPANDED_PLACE,
} from './../actions/PlaceActions';

const initialState = {
  isLoading: false,
  nearby: [],
  favourites: [],
  focusedMapPlaceId: null,
  expandedMapPlaceId: null,
  expandedFavouritePlaceId: null,
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
        nearby: action.payload,
      };

    case FETCH_NEARBY_PLACES__FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_FAVOURITE_PLACES:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_FAVOURITE_PLACES__SUCCESS:
      return {
        ...state,
        isLoading: false,
        favourites: action.payload,
      };

    case FETCH_FAVOURITE_PLACES__FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case SET_MAP_FOCUSED_PLACE:
      return {
        ...state,
        focusedMapPlaceId: action.payload,
      };

    case SET_MAP_EXPANDED_PLACE:
      return {
        ...state,
        expandedMapPlaceId: action.payload,
      };

    case SET_FAVOURITE_EXPANDED_PLACE:
      return {
        ...state,
        expandedFavouritePlaceId: action.payload,
      };

    default:
      return state;
  }
}
