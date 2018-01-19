import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

import SLIDER from './../../../config/map';
import { FONT_GREY, MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';
import transformKilometersToMeters from './../../../helpers/generalHelpers';

import Icon from './../Icon';
import PlaceholderImage from './../PlaceholderImage';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = (sliderWidth / 3) * 2;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: SLIDER.ITEM_HEIGHT,
    paddingHorizontal: 25,
  },

  image: {
    height: 125,
    marginHorizontal: -10,
  },

  content: {
    marginTop: -35,
    padding: 15,
    backgroundColor: '#ffffff',
  },

  name: {
    marginBottom: 5,
  },

  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressIcon: {
    marginRight: 5,
  },

  address: {
    fontSize: 10,
    color: FONT_GREY,
  },

  distanceContainer: {
    position: 'absolute',
    top: -10,
    right: -15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: MAIN_COLOR,
  },

  distanceIcon: {
    marginRight: 5,
  },

  distance: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontSize: 10,
  },
});

class PlaceCarouselItem extends React.PureComponent {
  render() {
    const {
      name,
      address,
      image,
      distance,
    } = this.props.place;

    return (
      <View style={styles.container}>
        <PlaceholderImage style={styles.image} src={image} />
        <View style={styles.content}>
          <Text style={styles.name}>{ name }</Text>
          <View style={styles.addressContainer}>
            <Icon style={styles.addressIcon} name="address" size={10} color={FONT_GREY} />
            <Text style={styles.address}>{ address }</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Icon style={styles.distanceIcon} name="location" size={10} color="#FFFFFF" />
            <Text style={styles.distance}>{ transformKilometersToMeters(distance) }m</Text>
          </View>
        </View>
      </View>
    );
  }
}

PlaceCarouselItem.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default PlaceCarouselItem;
