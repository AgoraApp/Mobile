import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './../../components/blocks/map/Map';
import PlacesCarousel from './../../components/blocks/map/PlacesCarousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Places = () => (
  <View style={styles.container}>
    <Map />
    <PlacesCarousel />
  </View>
);

export default Places;
