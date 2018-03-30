import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { MAIN_COLOR, FONT_GREY } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';

import Icon from './../Icon';
import Button from './../Button';
import PlaceholderImage from './../PlaceholderImage';

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

  image: {
    flex: 1,
    width: 75,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  name: {
    marginBottom: 2,
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

  button: {
    paddingVertical: 0,
    paddingHorizontal: 15,
    shadowOpacity: 0.1,
  },
});

class FavouritePlace extends React.PureComponent {
  handlePress = () => {

  }

  render() {
    const { place } = this.props;

    return (
      <View style={styles.container}>
        <PlaceholderImage style={styles.image} src={place.image} />
        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{ place.name }</Text>
            <View style={styles.addressContainer}>
              <Icon style={styles.addressIcon} name="address" size={10} color={FONT_GREY} />
              <Text style={styles.address}>{ place.address }</Text>
            </View>
          </View>
          <Button
            style={styles.button}
            onPress={this.handlePress}
          >
            <Icon
              name="arrow-down"
              color={MAIN_COLOR}
              size={16}
            />
          </Button>
        </View>
      </View>
    );
  }
}

FavouritePlace.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
};

export default FavouritePlace;
