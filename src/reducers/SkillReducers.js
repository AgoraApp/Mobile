import {
  FETCH_SKILL_AUTOCOMPLETE,
  FETCH_SKILL_AUTOCOMPLETE__SUCCESS,
  FETCH_SKILL_AUTOCOMPLETE__FAIL,
  RESET_SKILL_AUTOCOMPLETE,
} from './../actions/SkillActions';
import {
  FETCH_LOGOUT__SUCCESS,
} from './../actions/UserActions';

const initialState = {
  isLoading: false,
  hasNoResults: false,
  skills: [],
};

export default function skillState(state = initialState, action) {
  switch (action.type) {
    case FETCH_SKILL_AUTOCOMPLETE:
      return {
        ...state,
        isLoading: true,
        hasNoResults: false,
      };

    case FETCH_SKILL_AUTOCOMPLETE__SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasNoResults: action.payload.length === 0,
        skills: action.payload,
      };

    case FETCH_SKILL_AUTOCOMPLETE__FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case RESET_SKILL_AUTOCOMPLETE:
      return {
        ...state,
        skills: [],
        hasNoResults: false,
      };

    case FETCH_LOGOUT__SUCCESS:
      return initialState;

    default:
      return state;
  }
}
