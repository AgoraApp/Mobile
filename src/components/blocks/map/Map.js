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
import { fetchNearyPlaces, focusMapPlace } from './../../../actions/PlaceActions';
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
    this.getCurrentLocation()
      .then((location) => {
        if (location) {
          // const { coords: { latitude, longitude } } = location;
          // this.props.fetchNearyPlaces(latitude, longitude);
          // this.props.setRegion(latitude, longitude);
          this.props.fetchNearyPlaces(44.825917, -0.556826);
          this.props.setRegion(44.825917, -0.556826);

          // Location.watchPositionAsync({
          //   timeInterval: 60000,
          //   distanceInterval: 500,
          // }, this.onLocationChange);
        }
      });
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

  onLocationChange = ({ coords: { latitude, longitude } }) => {
    this.props.fetchNearyPlaces(latitude, longitude);
    this.props.setRegion(latitude, longitude);
  }

  getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      return null;
    }

    return Location.getCurrentPositionAsync({});
  }

  handleMarkerPress = (place) => {
    this.props.focusMapPlace(place);
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
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)).isRequired,
  focusedPlaceId: PropTypes.number,
  expandedPlaceId: PropTypes.number,
  fetchNearyPlaces: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  focusMapPlace: PropTypes.func.isRequired,
};

Map.defaultProps = {
  focusedPlaceId: null,
  expandedPlaceId: null,
};

const mapStateToProps = state => ({
  region: state.map.region,
  places: state.place.places.filter(place => state.place.nearby.includes(place.id)),
  focusedPlaceId: state.place.focusedMapPlaceId,
  expandedPlaceId: state.place.expandedMapPlaceId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchNearyPlaces,
    setRegion,
    focusMapPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
