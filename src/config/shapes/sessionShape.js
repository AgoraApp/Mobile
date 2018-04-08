import PropTypes from 'prop-types';

const sessionShape = {
  id: PropTypes.number,
  place_id: PropTypes.number,
  zone_id: PropTypes.number,
  created_at: PropTypes.string,
  end_at: PropTypes.string,
};

export default sessionShape;
