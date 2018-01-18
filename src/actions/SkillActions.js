import { API_BASE_URL } from './../config/api';

export const FETCH_SKILL_AUTOCOMPLETE = '@@SKILL/FETCH_SKILL_AUTOCOMPLETE';
export const FETCH_SKILL_AUTOCOMPLETE__SUCCESS = '@@SKILL/FETCH_SKILL_AUTOCOMPLETE__SUCCESS';
export const FETCH_SKILL_AUTOCOMPLETE__FAIL = '@@SKILL/FETCH_SKILL_AUTOCOMPLETE_FAIL';
export const RESET_SKILL_AUTOCOMPLETE = '@@SKILL/RESET_SKILL_AUTOCOMPLETE';

export const fetchSkillAutocomplete = value => (dispatch) => {
  dispatch({ type: FETCH_SKILL_AUTOCOMPLETE });

  fetch(`${API_BASE_URL}/skills/find/${value}`)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_SKILL_AUTOCOMPLETE__SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SKILL_AUTOCOMPLETE__FAIL,
        payload: error,
      });
    });
};

export const resetAutocomplete = () => ({
  type: RESET_SKILL_AUTOCOMPLETE,
});
