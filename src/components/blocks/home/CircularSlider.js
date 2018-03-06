import React from 'react';
import PropTypes from 'prop-types';
import { PanResponder } from 'react-native';
import { Svg } from 'expo';

import { MAIN_COLOR, TERTIARY_COLOR } from '../../../config/colors';

const { Path, Circle, G } = Svg;

class CircularSlider extends React.Component {
  constructor(props) {
    super(props);

    const { width, height, start } = props;
    const smallestSide = (Math.min(width, height));

    this.state = {
      value: start,
      cx: width / 2,
      cy: height / 2,
      r: (smallestSide / 2) * 0.85,
    };
  }

  componentWillMount = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
    });
  }

  polarToCartesian = (angle) => {
    const { cx, cy, r } = this.state;
    const a = ((angle - 90) * Math.PI) / 180.0;
    const x = cx + (r * Math.cos(a));
    const y = cy + (r * Math.sin(a));

    return { x, y };
  }

  cartesianToPolar = (x, y) => {
    const { cx, cy } = this.state;

    return Math.round((Math.atan(((y - cy) / (x - cx))) / (Math.PI / 180)) + ((x > cx) ? 90 : 270));
  }

  handlePanResponderMove = ({ nativeEvent: { locationX, locationY } }) => {
    this.setState({ value: this.cartesianToPolar(locationX, locationY) });
  }

  render() {
    const {
      width,
      height,
      backgroundColor,
      meterColor,
      buttonColor,
      handlePress,
    } = this.props;
    const {
      value,
      cx,
      cy,
      r,
    } = this.state;

    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(value);

    return (
      <Svg width={width} height={height}>
        <Path
          stroke={meterColor}
          strokeWidth={10}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={r - 4.5}
          fill={backgroundColor}
          onPress={() => handlePress(value)}
        />
        <G x={endCoord.x - 9} y={endCoord.y - 9}>
          <Circle cx={9} cy={9} r={18} fill={buttonColor} {...this.panResponder.panHandlers} />
        </G>
      </Svg>
    );
  }
}

CircularSlider.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  meterColor: PropTypes.string,
  buttonColor: PropTypes.string,
  handlePress: PropTypes.func.isRequired,
};

CircularSlider.defaultProps = {
  backgroundColor: MAIN_COLOR,
  meterColor: TERTIARY_COLOR,
  buttonColor: TERTIARY_COLOR,
};

export default CircularSlider;
