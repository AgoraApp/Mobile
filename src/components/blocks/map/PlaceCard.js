import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Dimensions, View, Text, Animated, TouchableOpacity } from 'react-native';

import { FONT_GREY, MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';
import { positionShape } from './../../../config/shapes/userShape';
import { transformKilometersToMeters, calculateDistance } from './../../../helpers/generalHelpers';
import { expandMapPlace, focusMapPlace } from './../../../actions/PlaceActions';

import Icon from './../Icon';
import Button from './../Button';
import PlaceholderImage from './../PlaceholderImage';
import Snappable from './../../core/Snappable';
import PlaceCardContent from './PlaceCardContent';

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  image: {
    height: 125,
    marginHorizontal: -10,
  },

  actionsContainer: {
    position: 'absolute',
    right: -20,
    top: -6,
  },

  button: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  content: {
    marginTop: -35,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  header: {
    marginVertical: 10,
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

  moreInfoButton: {
    alignItems: 'flex-end',
  },

  moreInfoText: {
    color: MAIN_COLOR,
    fontSize: 10,
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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

class PlaceCard extends React.PureComponent {
  constructor() {
    super();

    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;

    this.state = {
      cardWidth: new Animated.Value((this.deviceWidth / 3) * 2),
      contentHeight: new Animated.Value(75),
    };
  }

  handleSnapUp = () => {
    if (!this.props.expandedPlaceId) {
      this.props.expandMapPlace(this.props.place);

      Animated.stagger(250, [
        Animated.spring(this.state.contentHeight, {
          toValue: this.deviceHeight / 2,
          duration: 300,
        }),
        Animated.spring(this.state.cardWidth, {
          toValue: this.deviceWidth - 50,
          duration: 300,
        }),
      ]).start();
    }
  }

  handleSnapDown = () => {
    if (this.props.expandedPlaceId) {
      this.props.expandMapPlace({});

      Animated.stagger(250, [
        Animated.spring(this.state.contentHeight, {
          toValue: 75,
          duration: 300,
        }),
        Animated.spring(this.state.cardWidth, {
          toValue: (this.deviceWidth / 3) * 2,
          duration: 300,
        }),
      ]).start();
    } else {
      this.props.focusMapPlace({});
    }
  }

  renderCloseButton = () => (
    <Button
      style={styles.button}
      onPress={this.handleSnapDown}
    >
      <Icon
        style={styles.buttonIcon}
        name={this.props.expandedPlaceId ? 'arrow-down' : 'cancel'}
        color={MAIN_COLOR}
        size={16}
      />
    </Button>
  )

  renderContent = () => {
    if (this.props.expandedPlaceId) {
      return <PlaceCardContent place={this.props.place} />;
    }

    return (
      <TouchableOpacity style={styles.moreInfoButton} onPress={this.handleSnapUp}>
        <Text style={styles.moreInfoText}>More information</Text>
      </TouchableOpacity>
    );
  }

  renderDistance = () => {
    const { place, position } = this.props;

    if (Object.keys(position).length === 0) {
      return null;
    }

    const distance = calculateDistance(
      place.latitude,
      place.longitude,
      position.latitude,
      position.longitude,
    );

    return (
      <View style={styles.distanceContainer}>
        <Icon style={styles.distanceIcon} name="location" size={10} color="#FFFFFF" />
        <Text style={styles.distance}>{ transformKilometersToMeters(distance) }m</Text>
      </View>
    );
  }

  render() {
    const { place } = this.props;
    const { name, address, image } = place;

    return (
      <Animated.View style={[styles.container, {
          width: this.state.cardWidth,
        }]}
      >
        <Snappable
          isExpanded={this.props.expandedPlaceId !== null}
          onSnapUp={this.handleSnapUp}
          onSnapDown={this.handleSnapDown}
        >
          <View style={styles.imageContainer}>
            <PlaceholderImage style={styles.image} src={image} />
          </View>
          <View style={styles.actionsContainer}>
            { this.renderCloseButton() }
          </View>
          <Animated.View style={[styles.content, {
              height: this.state.contentHeight,
            }]}
          >
            <View style={styles.header}>
              <Text style={styles.name}>{ name }</Text>
              <View style={styles.addressContainer}>
                <Icon style={styles.addressIcon} name="address" size={10} color={FONT_GREY} />
                <Text style={styles.address}>{ address }</Text>
              </View>
            </View>
            { this.renderContent() }
            { this.renderDistance() }
          </Animated.View>
        </Snappable>
      </Animated.View>
    );
  }
}

PlaceCard.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  position: PropTypes.shape(positionShape),
  expandedPlaceId: PropTypes.number,
  expandMapPlace: PropTypes.func.isRequired,
  focusMapPlace: PropTypes.func.isRequired,
};

PlaceCard.defaultProps = {
  position: {},
  expandedPlaceId: null,
};

const mapStateToProps = state => ({
  expandedPlaceId: state.place.expandedMapPlaceId,
  position: state.user.position,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    expandMapPlace,
    focusMapPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
