import PropTypes from 'prop-types';

export const skillShape = {
  id: PropTypes.number,
  name: PropTypes.string,
};

export const positionShape = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export const userShape = {
  id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  expertise: PropTypes.string,
  skills: skillShape,
};
