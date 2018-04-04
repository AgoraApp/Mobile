import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Animated, View } from 'react-native';

import placeShape from '../../../config/shapes/placeShape';

import { fetchPlace } from '../../../actions/PlaceActions';

import PlaceCard from './PlaceCard';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

class PlaceContainer extends React.PureComponent {
  constructor() {
    super();

    this.translateY = new Animated.Value(200);

    this.state = {
      focusedPlace: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focusedPlaceId !== this.props.focusedPlaceId) {
      const focusedPlace = this.props.places.find(place => place.id === this.props.focusedPlaceId);

      if (focusedPlace && !focusedPlace.zones) {
        this.props.fetchPlace(focusedPlace.id);
      }

      if (prevProps.focusedPlaceId) {
        this.hideCard().start(() => {
          if (this.props.focusedPlaceId) {
            this.setState({ focusedPlace });
            this.showCard().start();
          } else {
            this.setState({ focusedPlace: null });
          }
        });
      } else {
        this.setState({ focusedPlace });
        this.showCard().start();
      }
    }
  }

  showCard = () => (
    Animated.timing(this.translateY, {
      toValue: 0,
      duration: 300,
    })
  )

  hideCard = () => (
    Animated.timing(this.translateY, {
      toValue: 200,
      duration: 300,
    })
  )

  render() {
    const { focusedPlace } = this.state;

    return (
      <View style={styles.container}>
        {
          focusedPlace ?
            <Animated.View style={{ transform: [{ translateY: this.translateY }] }}>
              <PlaceCard place={focusedPlace} />
            </Animated.View>
            : null
        }
      </View>
    );
  }
}

PlaceContainer.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)),
  focusedPlaceId: PropTypes.number,
  fetchPlace: PropTypes.func.isRequired,
};

PlaceContainer.defaultProps = {
  places: [],
  focusedPlaceId: null,
};

const mapStateToProps = state => ({
  places: state.place.places.filter(place => state.place.nearby.includes(place.id)),
  focusedPlaceId: state.place.focusedMapPlaceId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer);
