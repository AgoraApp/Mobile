import React from 'react';
import { StyleSheet, View } from 'react-native';

import RootTabRouter from './../../navigation/RootTabNavigation';
import ViewSessions from './ViewSessions';
import CreateSession from './CreateSession';
import UpdateZone from './UpdateZone';
import UpdateDuration from './UpdateDuration';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Root = () => (
  <View style={styles.container}>
    <RootTabRouter />
    <ViewSessions />
    <CreateSession />
    <UpdateZone />
    <UpdateDuration />
  </View>
);

export default Root;
