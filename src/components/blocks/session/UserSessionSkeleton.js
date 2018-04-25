import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Svg } from 'expo';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const UserSessionSkeleton = () => (
  <View style={styles.container}>
    <SvgAnimatedLinearGradient height={154} width={Dimensions.get('window').width}>
      <Svg.Circle x="30" y="30" r="30" />
      <Svg.Rect x="75" y="5" width="200" height="16" />
      <Svg.Rect x="75" y="26" width="125" height="20" />
      <Svg.Rect x="0" y="70" width="120" height="14" />
      <Svg.Rect x="0" y="89" width="55" height="16" />
      <Svg.Rect x="0" y="115" width="110" height="14" />
      <Svg.Rect x="0" y="134" width="75" height="16" />
      {/* <Svg.Rect x="95" y="20" width="150" height="16" />
      <Svg.Rect x="95" y="40" width="100" height="10" /> */}
    </SvgAnimatedLinearGradient>
  </View>
);

export default UserSessionSkeleton;
