import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';

import PlaceFavouriteButton from './../place/PlaceFavouriteButton';

class PlaceCardContent extends React.PureComponent {
  render() {
    const { place } = this.props;

    console.log(place);

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <PlaceFavouriteButton place={place} />
        <Text>{ place.description }</Text>
      </ScrollView>
    );
  }
}

PlaceCardContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default PlaceCardContent;
