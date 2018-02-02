import {
  EDIT_MODE__ENABLE,
  EDIT_MODE__DISABLE,
} from './../actions/ProfileActions';

const initialState = {
  isEditMode: false,
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
      };

    default:
      return state;
  }
}
