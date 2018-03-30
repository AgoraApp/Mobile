import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';

import { MAIN_COLOR, FONT_GREY } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';

import { expandFavouritePlace } from './../../../actions/PlaceActions';

import Icon from './../Icon';
import Button from './../Button';
import PlaceholderImage from './../PlaceholderImage';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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

class FavouritePlaceHeader extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expandedPlaceId !== nextProps.expandedPlaceId) {
      Animated.timing(
        this.state.spinValue,
        {
          toValue: nextProps.expandedPlaceId === nextProps.place.id ? 1 : 0,
          duration: 300,
          easing: Easing.in,
        },
      ).start();
    }
  }

  handlePress = () => {
    const { place, expandedPlaceId } = this.props;

    if (place.id === expandedPlaceId) {
      this.props.expandFavouritePlace(null);
    } else {
      this.props.expandFavouritePlace(place.id);
    }
  }

  render() {
    const { place } = this.props;

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

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
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Icon
                name="arrow-down"
                color={MAIN_COLOR}
                size={16}
              />
            </Animated.View>
          </Button>
        </View>
      </View>
    );
  }
}

FavouritePlaceHeader.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  expandedPlaceId: PropTypes.number,
  expandFavouritePlace: PropTypes.func.isRequired,
};

FavouritePlaceHeader.defaultProps = {
  expandedPlaceId: null,
};

const mapStateToProps = state => ({
  expandedPlaceId: state.place.expandedFavouritePlaceId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    expandFavouritePlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FavouritePlaceHeader);
