import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { DangerZone } from 'expo';

const { GestureHandler } = DangerZone;
const { PanGestureHandler, State } = GestureHandler;

const USE_NATIVE_DRIVER = true;

class Snappable extends React.Component {
  constructor(props) {
    super(props);

    this.dragY = new Animated.Value(0);

    this.transY = this.dragY.interpolate({
      inputRange: [-100, -50, 0, 50, 100],
      outputRange: [-30, -10, 0, 10, 30],
    });

    this.expandedTransY = this.dragY.interpolate({
      inputRange: [-100, -50, 0, 50, 100],
      outputRange: [0, 0, 0, 10, 30],
    });

    this.onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this.dragY } }],
      { useNativeDriver: USE_NATIVE_DRIVER },
    );
  }

  onHandlerStateChange = (event) => {
    if (event.nativeEvent.translationY < -120 && !this.props.isExpanded) {
      this.props.onSnapUp();
    }

    if (event.nativeEvent.translationY > 120) {
      this.props.onSnapDown();
    }

    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.dragY, {
        velocity: event.nativeEvent.velocityY,
        tension: 10,
        friction: 8,
        toValue: 0,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    }
  };

  render() {
    const { children, isExpanded } = this.props;

    return (
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View style={{
            transform: [{
              translateY: isExpanded ? this.expandedTransY : this.transY,
            }],
          }}
        >
          { children }
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

Snappable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onSnapUp: PropTypes.func.isRequired,
  onSnapDown: PropTypes.func.isRequired,
};

export default Snappable;
