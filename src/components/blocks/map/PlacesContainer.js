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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focusedPlaceId !== this.props.focusedPlaceId) {
      if (this.props.focusedPlace && !this.props.focusedPlace.zones) {
        this.props.fetchPlace(this.props.focusedPlace.id);
      }

      if (prevProps.focusedPlaceId) {
        this.hideCard().start(() => {
          if (this.props.focusedPlaceId) {
            this.showCard().start();
          }
        });
      } else {
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
    const { focusedPlace } = this.props;

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
  focusedPlace: PropTypes.shape(placeShape),
  focusedPlaceId: PropTypes.number,
  fetchPlace: PropTypes.func.isRequired,
};

PlaceContainer.defaultProps = {
  focusedPlace: null,
  focusedPlaceId: null,
};

const mapStateToProps = state => ({
  focusedPlace: state.place.places.find(place => place.id === state.place.focusedMapPlaceId),
  focusedPlaceId: state.place.focusedMapPlaceId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceContainer);
