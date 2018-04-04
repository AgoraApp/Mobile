import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Skeleton from './../Skeleton';

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

  imageContainer: {
    width: 75,
  },

  imageGradient: {
    flex: 1,
    width: 75,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  nameContainer: {
    height: 15,
    marginBottom: 2,
  },

  nameGradient: {
    flex: 1,
    width: 150,
  },

  addressContainer: {
    height: 10,
  },

  addressGradient: {
    flex: 1,
    width: 100,
  },

  buttonContainer: {
    height: 25,
  },

  buttonGradient: {
    flex: 1,
    width: 35,
    borderRadius: 50,
  },
});

const FavouritePlaceSkeleton = ({ index }) => (
  <View style={[styles.container, { marginTop: index === 0 ? 5 : 0 }]}>
    <View style={styles.imageContainer}>
      <Skeleton style={styles.imageGradient} />
    </View>
    <View style={styles.content}>
      <View>
        <View style={styles.nameContainer}>
          <Skeleton style={styles.nameGradient} />
        </View>
        <View style={styles.addressContainer}>
          <Skeleton style={styles.addressGradient} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Skeleton style={styles.buttonGradient} />
      </View>
    </View>
  </View>
);

FavouritePlaceSkeleton.propTypes = {
  index: PropTypes.number.isRequired,
};

export default FavouritePlaceSkeleton;
