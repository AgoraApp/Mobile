import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

class Skeleton extends React.PureComponent {
  render() {
    const { style } = this.props;

    return (
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={['#e3e3e3', '#f3f3f3']}
        style={style}
      />
    );
  }
}

Skeleton.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
};

Skeleton.defaultProps = {
  style: {},
};

export default Skeleton;
