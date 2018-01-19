import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Carousel from 'react-native-snap-carousel';

import { StyleSheet, Dimensions, View } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';
import { setRegion } from './../../../actions/MapActions';

import PlaceCarouselItem from './PlaceCarouselItem';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = (sliderWidth / 3) * 2;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
  },
});

class PlacesCarousel extends React.PureComponent {
  handleSnap = (index) => {
    const place = this.props.places[index];

    this.props.setRegion(place.latitude, place.longitude);
  }


  render() {
    const { places } = this.props;

    return (
      <View style={styles.container}>
        <Carousel
          data={places}
          renderItem={({ item }) => <PlaceCarouselItem place={item} />}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.85}
          inactiveSlideOpacity={0.7}
          onSnapToItem={this.handleSnap}
        />
      </View>
    );
  }
}

PlacesCarousel.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)).isRequired,
  setRegion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  places: state.place.places,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setRegion,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlacesCarousel);
