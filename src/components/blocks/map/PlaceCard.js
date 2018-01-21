import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Dimensions, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';

import { FONT_GREY, MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';
import transformKilometersToMeters from './../../../helpers/generalHelpers';
import { expandPlace, focusPlace } from './../../../actions/PlaceActions';

import Icon from './../Icon';
import Button from './../Button';
import PlaceholderImage from './../PlaceholderImage';
import Snappable from './../../core/Snappable';

const styles = StyleSheet.create({
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
      this.props.expandPlace(this.props.place);

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
      this.props.expandPlace({});

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
      this.props.focusPlace({});
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

  render() {
    const {
      name,
      address,
      image,
      distance,
    } = this.props.place;

    return (
      <TouchableWithoutFeedback onPress={this.handleSnapUp}>
        <Animated.View style={[styles.container, {
            width: this.state.cardWidth,
          }]}
        >
          <Snappable
            isExpanded={this.props.expandedPlaceId !== null}
            onSnapUp={this.handleSnapUp}
            onSnapDown={this.handleSnapDown}
          >
            <PlaceholderImage style={styles.image} src={image} />
            <View style={styles.actionsContainer}>
              { this.renderCloseButton() }
            </View>
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
      </TouchableWithoutFeedback>
    );
  }
}

PlaceCard.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  expandedPlaceId: PropTypes.number,
  expandPlace: PropTypes.func.isRequired,
  focusPlace: PropTypes.func.isRequired,
};

PlaceCard.defaultProps = {
  expandedPlaceId: null,
};

const mapStateToProps = state => ({
  expandedPlaceId: state.place.expandedPlaceId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    expandPlace,
    focusPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
