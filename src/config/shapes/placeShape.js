import PropTypes from 'prop-types';

import zoneShape from './zoneShape';

const placeShape = {
  id: PropTypes.number,
  name: PropTypes.string,
  address: PropTypes.string,
  zip_code: PropTypes.string,
  country: PropTypes.string,
  image: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  description: PropTypes.string,
  zones: PropTypes.arrayOf(PropTypes.shape(zoneShape)),
};

export default placeShape;
