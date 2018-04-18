import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';

import PlaceFavouriteButton from './../place/PlaceFavouriteButton';
import CreateSessionButton from './../session/CreateSessionButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },

  content: {
    flexGrow: 1,
  },
});

class PlaceCardContent extends React.PureComponent {
  render() {
    const { place } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <PlaceFavouriteButton place={place} />
        <View style={styles.content}>
          <Text>{ place.description }</Text>
        </View>
        <CreateSessionButton place={place} />
      </ScrollView>
    );
  }
}

PlaceCardContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default PlaceCardContent;
