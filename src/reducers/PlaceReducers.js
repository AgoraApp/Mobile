import {
  FETCH_PLACE,
  FETCH_PLACE__SUCCESS,
  FETCH_PLACE__FAIL,
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
  isDetailLoading: false,
  isNearbyLoading: false,
  isFavouritesLoading: false,
  places: [],
  nearby: [],
  favourites: [],
  focusedMapPlaceId: null,
  expandedMapPlaceId: null,
  expandedFavouritePlaceId: null,
};

// HELPER FUNCTIONS
const removeDuplicatePlaces = places => (
  places.filter((place, index, self) => (
    self.findIndex(p => p.id === place.id) === index
  ))
);

export default function placeState(state = initialState, action) {
  let newPlaces = [];
  let hasReplacedPlace = false;

  switch (action.type) {
    case FETCH_PLACE:
      return {
        ...state,
        isDetailLoading: true,
      };

    case FETCH_PLACE__SUCCESS:
      newPlaces = state.places.map((place) => {
        if (place.id === action.payload.id) {
          hasReplacedPlace = true;
          return action.payload;
        }

        return place;
      });

      if (!hasReplacedPlace) {
        newPlaces.push(action.payload);
      }

      return {
        ...state,
        isDetailLoading: false,
        places: newPlaces,
      };

    case FETCH_PLACE__FAIL:
      return {
        ...state,
        isDetailLoading: false,
      };

    case FETCH_NEARBY_PLACES:
      return {
        ...state,
        isNearbyLoading: true,
      };

    case FETCH_NEARBY_PLACES__SUCCESS:
      newPlaces = removeDuplicatePlaces([...state.places, ...action.payload]);

      return {
        ...state,
        isNearbyLoading: false,
        places: newPlaces,
        nearby: action.payload.map(place => place.id),
      };

    case FETCH_NEARBY_PLACES__FAIL:
      return {
        ...state,
        isNearbyLoading: false,
      };

    case FETCH_FAVOURITE_PLACES:
      return {
        ...state,
        isFavouritesLoading: true,
      };

    case FETCH_FAVOURITE_PLACES__SUCCESS:
      newPlaces = removeDuplicatePlaces([...state.places, ...action.payload]);

      return {
        ...state,
        isFavouritesLoading: false,
        places: newPlaces,
      };

    case FETCH_FAVOURITE_PLACES__FAIL:
      return {
        ...state,
        isFavouritesLoading: false,
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
