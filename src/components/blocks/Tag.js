import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { SECONDARY_COLOR } from './../../config/colors';

class Tag extends React.PureComponent {
  getContainerStyles = () => {
    const baseStyles = {
      backgroundColor: this.props.color,
      borderRadius: 50,
    };

    switch (this.props.size) {
      case 'small':
        return {
          ...baseStyles,
          paddingHorizontal: 15,
          paddingVertical: 5,
        };

      case 'normal':
        return {
          ...baseStyles,
          paddingHorizontal: 20,
          paddingVertical: 10,
        };

      case 'large':
        return {
          ...baseStyles,
          paddingHorizontal: 25,
          paddingVertical: 15,
        };

      default:
        return {
          ...baseStyles,
          paddingHorizontal: 20,
          paddingVertical: 10,
        };
    }
  }

  getTextStyles() {
    const baseStyles = {
      color: this.props.fontColor,
      textAlign: 'center',
    };

    switch (this.props.size) {
      case 'small':
        return {
          ...baseStyles,
          fontSize: 12,
        };

      case 'normal':
        return {
          ...baseStyles,
          fontSize: 14,
        };

      case 'large':
        return {
          ...baseStyles,
          fontSize: 16,
        };

      default:
        return {
          ...baseStyles,
          fontSize: 16,
        };
    }
  }

  render() {
    const { text, style } = this.props;

    return (
      <View style={[style, this.getContainerStyles()]}>
        <Text style={this.getTextStyles()}>{ text }</Text>
      </View>
    );
  }
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
};

Tag.defaultProps = {
  color: SECONDARY_COLOR,
  fontColor: '#FFFFFF',
  size: 'normal',
  style: {},
};

export default Tag;
