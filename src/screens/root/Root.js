import React from 'react';
import { StyleSheet, View } from 'react-native';

import RootTabRouter from './../../navigation/RootTabNavigation';
import CreateSession from './CreateSession';
import UpdateZone from './UpdateZone';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Root = () => (
  <View style={styles.container}>
    <RootTabRouter />
    <CreateSession />
    <UpdateZone />
  </View>
);

export default Root;
