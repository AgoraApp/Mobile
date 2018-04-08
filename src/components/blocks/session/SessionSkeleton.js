import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

const styles = StyleSheet.create({
  container: {
  },
});

const SessionSkeleton = ({ index }) => (
  <View style={[styles.container, { marginTop: index === 0 ? 5 : 0 }]}>
    <SvgAnimatedLinearGradient height={75} width={Dimensions.get('window').width}>
      <Svg.Rect x="0" y="0" width="75" height="75" />
      <Svg.Rect x="95" y="20" width="150" height="16" />
      <Svg.Rect x="95" y="40" width="100" height="10" />
    </SvgAnimatedLinearGradient>
  </View>
);

SessionSkeleton.propTypes = {
  index: PropTypes.number.isRequired,
};

export default SessionSkeleton;
