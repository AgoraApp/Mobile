import {
  FETCH_SKILL_AUTOCOMPLETE,
  FETCH_SKILL_AUTOCOMPLETE__SUCCESS,
  FETCH_SKILL_AUTOCOMPLETE__FAIL,
  RESET_SKILL_AUTOCOMPLETE,
} from './../actions/SkillActions';

const initialState = {
  isLoading: false,
  skills: [],
};

export default function skillState(state = initialState, action) {
  switch (action.type) {
    case FETCH_SKILL_AUTOCOMPLETE:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_SKILL_AUTOCOMPLETE__SUCCESS:
      return {
        ...state,
        isLoading: false,
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
      };

    default:
      return state;
  }
}
