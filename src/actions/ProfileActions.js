export const SET_FIRST_NAME = '@@PROFILE/SET_FIRST_NAME';
export const SET_LAST_NAME = '@@PROFILE/SET_LAST_NAME';
export const SET_EXPERTISE = '@@PROFILE/SET_EXPERTISE';
export const SET_AVATAR = '@@PROFILE/SET_AVATAR';

export const EDIT_MODE__ENABLE = '@@PROFILE/EDIT_MODE__ENABLE';
export const EDIT_MODE__DISABLE = '@@PROFILE/EDIT_MODE__DISABLE';

export const setFirstName = value => ({
  type: SET_FIRST_NAME,
  payload: value,
});

export const setLastName = value => ({
  type: SET_LAST_NAME,
  payload: value,
});

export const setExpertise = value => ({
  type: SET_EXPERTISE,
  payload: value,
});

export const setAvatar = value => ({
  type: SET_AVATAR,
  payload: value,
});

export const enableEditMode = user => ([
  { type: EDIT_MODE__ENABLE },
  setFirstName(user.firstName),
  setLastName(user.lastName),
  setExpertise(user.expertise),
]);

export const disableEditMode = () => ({
  type: EDIT_MODE__DISABLE,
});
