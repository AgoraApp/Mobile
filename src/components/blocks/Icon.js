import React from 'react';
import PropTypes from 'prop-types';
import { createIconSetFromFontello } from '@expo/vector-icons';

import iconConfig from './../../config/icons.json';

const BaseIcon = createIconSetFromFontello(iconConfig, 'AgoraIcons');

class Icon extends React.PureComponent {
  render() {
    const {
      name,
      size,
      color,
      style,
    } = this.props;

    return (
      <BaseIcon style={style} name={name} size={size} color={color} />
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
};

Icon.defaultProps = {
  size: 20,
  color: 'white',
  style: {},
};

export default Icon;
