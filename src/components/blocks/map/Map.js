import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Image } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

import redPin from './../../../../assets/pin_red.png';
import bluePin from './../../../../assets/pin_blue.png';

import placeShape from './../../../config/shapes/placeShape';
import regionShape from './../../../config/shapes/mapShape';
import { fetchNearyPlaces, focusPlace } from './../../../actions/PlaceActions';
import { setRegion } from './../../../actions/MapActions';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

class Map extends React.Component {
  constructor() {
    super();

    this.map = null;
  }

  componentDidMount() {
    if (!this.props.isLoading && this.props.places.length === 0) {
      this.getCurrentLocation()
        .then((location) => {
          if (location) {
            // this.props.fetchNearyPlaces(location.coords.latitude, location.coords.longitude);
            // this.props.setRegion(location.coords.latitude, location.coords.longitude);
            this.props.fetchNearyPlaces(44.825917, -0.556826);
            this.props.setRegion(44.825917, -0.556826);
          }
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.region.latitude !== nextProps.region.latitude ||
        this.props.region.longitude !== nextProps.region.longitude) {
      this.map.animateToRegion({
        latitude: nextProps.region.latitude,
        longitude: nextProps.region.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }

    if (!this.props.expandedPlaceId && nextProps.expandedPlaceId) {
      this.map.animateToRegion({
        latitude: nextProps.region.latitude + 0.0005,
        longitude: nextProps.region.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    if (this.props.expandedPlaceId && !nextProps.expandedPlaceId) {
      this.map.animateToRegion({
        latitude: nextProps.region.latitude,
        longitude: nextProps.region.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }

  getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      return null;
    }

    return Location.getCurrentPositionAsync({});
  }

  handleMarkerPress = (place) => {
    this.props.focusPlace(place);
  }

  render() {
    const { places, focusedPlaceId, expandedPlaceId } = this.props;

    return (
      <MapView
        ref={(map) => { this.map = map; }}
        style={styles.map}
        showsUserLocation
        scrollEnabled={expandedPlaceId === null}
        zoomEnabled={expandedPlaceId === null}
        rotateEnabled={expandedPlaceId === null}
        pitchEnabled={expandedPlaceId === null}
      >
        {
          places.map(place => (
            <MapView.Marker
              key={place.id}
              centerOffset={{ x: -0.5, y: -18 }}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              onPress={() => this.handleMarkerPress(place)}
            >
              <Image
                source={focusedPlaceId === place.id ? bluePin : redPin}
                style={{ width: 30, height: 45 }}
              />
            </MapView.Marker>
          ))
        }
      </MapView>
    );
  }
}

Map.propTypes = {
  region: PropTypes.shape(regionShape).isRequired,
  isLoading: PropTypes.bool.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)).isRequired,
  focusedPlaceId: PropTypes.number,
  expandedPlaceId: PropTypes.number,
  fetchNearyPlaces: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  focusPlace: PropTypes.func.isRequired,
};

Map.defaultProps = {
  focusedPlaceId: null,
  expandedPlaceId: null,
};

const mapStateToProps = state => ({
  region: state.map.region,
  isLoading: state.place.isLoading,
  places: state.place.places,
  focusedPlaceId: state.place.focusedPlaceId,
  expandedPlaceId: state.place.expandedPlaceId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchNearyPlaces,
    setRegion,
    focusPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
