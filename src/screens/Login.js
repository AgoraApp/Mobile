import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

import { MAIN_COLOR } from './../config/colors';
import splashImage from './../../assets/splash.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },

  background: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },
});

const Login = () => (
  <View style={styles.container}>
    <ImageBackground style={styles.background} resizeMode="contain" source={splashImage}>
      <View><Text>Login</Text></View>
    </ImageBackground>
  </View>
);

export default Login;
