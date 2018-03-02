import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Constants } from 'expo';

import { MAIN_COLOR } from './../../../config/colors';
import logo from './../../../../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: MAIN_COLOR,
  },

  logo: {
    marginTop: Constants.statusBarHeight,
    width: 117,
    height: 30,
  },
});

const Header = () => (
  <View style={styles.container}>
    <Image
      source={logo}
      style={styles.logo}
    />
  </View>
);

export default Header;
