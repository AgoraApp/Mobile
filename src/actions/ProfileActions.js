export const EDIT_MODE__ENABLE = '@@PROFILE/EDIT_MODE__ENABLE';
export const EDIT_MODE__DISABLE = '@@PROFILE/EDIT_MODE__DISABLE';

export const enableEditMode = () => (dispatch) => {
  dispatch({ type: EDIT_MODE__ENABLE });
};

export const disableEditMode = () => (dispatch) => {
  dispatch({ type: EDIT_MODE__DISABLE });
};
