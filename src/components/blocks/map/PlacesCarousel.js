import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, View } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';
import { focusPlace } from './../../../actions/PlaceActions';

import PlaceCarouselItem from './PlaceCarouselItem';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

class PlacesCarousel extends React.PureComponent {
  handleSnap = (index) => {
    const place = this.props.places[index];

    this.props.focusPlace(place);
  }


  render() {
    const { places } = this.props;

    return (
      <View style={styles.container}>
        {
          places.length > 0 ?
            <PlaceCarouselItem place={places[0]} />
            : null
        }
      </View>
    );
  }
}

PlacesCarousel.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)).isRequired,
  focusPlace: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  places: state.place.places,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    focusPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlacesCarousel);
