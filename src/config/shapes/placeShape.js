import PropTypes from 'prop-types';

const placeShape = {
  id: PropTypes.number,
  name: PropTypes.string,
  address: PropTypes.string,
  image: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default placeShape;
