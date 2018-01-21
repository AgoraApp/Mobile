import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text, Animated } from 'react-native';

import { FONT_GREY, MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';
import transformKilometersToMeters from './../../../helpers/generalHelpers';

import Icon from './../Icon';
import PlaceholderImage from './../PlaceholderImage';
import Snappable from './../../core/Snappable';

const styles = StyleSheet.create({
  image: {
    height: 125,
    marginHorizontal: -10,
  },

  content: {
    justifyContent: 'center',
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
  constructor() {
    super();

    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;

    this.state = {
      // imageHeight: new Animated.Value(125),
      cardWidth: new Animated.Value((this.deviceWidth / 3) * 2),
      contentHeight: new Animated.Value(75),
    };
  }

  handleSnapUp = () => {
    Animated.stagger(250, [
      Animated.spring(this.state.contentHeight, { toValue: this.deviceHeight / 2, duration: 300 }),
      Animated.spring(this.state.cardWidth, { toValue: this.deviceWidth - 50, duration: 300 }),
    ]).start();
  }

  handleSnapDown = () => {
    Animated.stagger(250, [
      Animated.spring(this.state.contentHeight, { toValue: 75, duration: 300 }),
      Animated.spring(this.state.cardWidth, { toValue: (this.deviceWidth / 3) * 2, duration: 300 }),
    ]).start();
  }

  render() {
    const {
      name,
      address,
      image,
      distance,
    } = this.props.place;

    return (
      <Animated.View style={[styles.container, {
          width: this.state.cardWidth,
        }]}
      >
        <Snappable
          onSnapUp={this.handleSnapUp}
          onSnapDown={this.handleSnapDown}
        >
          <PlaceholderImage style={styles.image} src={image} />
          <Animated.View style={[styles.content, {
              height: this.state.contentHeight,
            }]}
          >
            <Text style={styles.name}>{ name }</Text>
            <View style={styles.addressContainer}>
              <Icon style={styles.addressIcon} name="address" size={10} color={FONT_GREY} />
              <Text style={styles.address}>{ address }</Text>
            </View>
            <View style={styles.distanceContainer}>
              <Icon style={styles.distanceIcon} name="location" size={10} color="#FFFFFF" />
              <Text style={styles.distance}>{ transformKilometersToMeters(distance) }m</Text>
            </View>
          </Animated.View>
        </Snappable>
      </Animated.View>
    );
  }
}

PlaceCarouselItem.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default PlaceCarouselItem;
