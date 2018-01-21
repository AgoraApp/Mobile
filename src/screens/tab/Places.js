import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './../../components/blocks/map/Map';
import PlacesContainer from '../../components/blocks/map/PlacesContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Places = () => (
  <View style={styles.container}>
    <Map />
    <PlacesContainer />
  </View>
);

export default Places;
