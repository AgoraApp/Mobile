import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 50,
  },
});

class Button extends React.PureComponent {
  render() {
    const { color, style, children } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }, style]}
        onPress={() => this.props.onPress()}
      >
        { children }
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: '#FFFFFF',
  style: {},
};

export default Button;
