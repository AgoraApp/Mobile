import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Svg } from 'expo';
import moment from 'moment';

import { MAIN_COLOR, TERTIARY_COLOR } from './../../../config/colors';
import { secondsToHoursAndMinutes } from './../../../helpers/generalHelpers';

const {
  Path,
  Circle,
  G,
  Text,
} = Svg;

const COUNTDOWN_SIZE = Dimensions.get('window').width * 0.55;

class Countdown extends React.PureComponent {
  constructor(props) {
    super();

    const now = moment();
    const start = moment(props.start);
    const end = moment(props.end);

    const totalDuration = end.diff(start, 'seconds');
    const elapsedDuration = now.diff(start, 'seconds');

    this.state = {
      cx: COUNTDOWN_SIZE / 2,
      cy: COUNTDOWN_SIZE / 2,
      r: (COUNTDOWN_SIZE / 2) * 0.85,
      totalDuration,
      elapsedDuration,
    };

    this.refreshInterval = setInterval(this.setRemainingSeconds, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  setRemainingSeconds = () => {
    const now = moment();
    const start = moment(this.props.start);
    const elapsedDuration = now.diff(start, 'seconds');

    if (elapsedDuration >= this.state.totalDuration) {
      this.props.onDone();
    } else {
      this.setState({ elapsedDuration });
    }
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

  renderDuration() {
    const { totalDuration, elapsedDuration } = this.state;
    const remainingDuration = totalDuration - elapsedDuration;

    const { hours, minutes } = secondsToHoursAndMinutes(remainingDuration);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (hours > 0) {
      return formattedMinutes > 0 ? `${hours}h ${formattedMinutes}min` : `${hours}h`;
    }

    return formattedMinutes > 0 ? `${formattedMinutes}min` : '< 1min';
  }

  render() {
    const {
      cx,
      cy,
      r,
      totalDuration,
      elapsedDuration,
    } = this.state;

    let value = ((totalDuration - elapsedDuration) / totalDuration) * 360;

    if (value === 360) {
      value = 360 - 0.01;
    }

    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(value);

    return (
      <Svg width={COUNTDOWN_SIZE} height={COUNTDOWN_SIZE}>
        <Path
          stroke={TERTIARY_COLOR}
          strokeWidth={10}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
        />
        <G>
          <Circle
            cx={cx}
            cy={cy}
            r={r - 4.5}
            fill={MAIN_COLOR}
          />
          <Text x={cx} y={cy - (30 + 7)} fontSize={14} fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Time remaining</Text>
          <Text x={cx} y={cy} dy={30 * -0.25} fontSize={30} fontWeight="bold" fill="#FFFFFF" textAnchor="middle">{ this.renderDuration() }</Text>
        </G>
      </Svg>
    );
  }
}

Countdown.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default Countdown;
