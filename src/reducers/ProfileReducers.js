import {
  EDIT_MODE__ENABLE,
  EDIT_MODE__DISABLE,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EXPERTISE,
  SET_AVATAR,
} from './../actions/ProfileActions';
import {
  FETCH_LOGOUT__SUCCESS,
} from './../actions/UserActions';

const initialState = {
  isEditMode: false,
  firstName: '',
  lastName: '',
  expertise: '',
  avatar: null,
};

export default function profileState(state = initialState, action) {
  switch (action.type) {
    case EDIT_MODE__ENABLE:
      return {
        ...state,
        isEditMode: true,
      };

    case EDIT_MODE__DISABLE:
      return {
        ...state,
        isEditMode: false,
        firstName: '',
        lastName: '',
        expertise: '',
        avatar: null,
      };

    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };

    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };

    case SET_EXPERTISE:
      return {
        ...state,
        expertise: action.payload,
      };

    case SET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };

    case FETCH_LOGOUT__SUCCESS:
      return initialState;

    default:
      return state;
  }
}
