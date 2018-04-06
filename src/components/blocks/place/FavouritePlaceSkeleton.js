import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});

const FavouritePlaceSkeleton = ({ index }) => (
  <View style={[styles.container, { marginTop: index === 0 ? 5 : 0 }]}>
    <SvgAnimatedLinearGradient height={75} width={Dimensions.get('window').width}>
      <Svg.Rect x="0" y="0" width="75" height="75" />
      <Svg.Rect x="95" y="20" width="150" height="16" />
      <Svg.Rect x="95" y="40" width="100" height="10" />
      <Svg.Rect x={Dimensions.get('window').width - 60} y="25" rx="10" ry="10" width="40" height="25" />
    </SvgAnimatedLinearGradient>
  </View>
);

FavouritePlaceSkeleton.propTypes = {
  index: PropTypes.number.isRequired,
};

export default FavouritePlaceSkeleton;
