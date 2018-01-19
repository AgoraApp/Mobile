import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Image } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

import pin from './../../../../assets/pin_red.png';

import placeShape from './../../../config/shapes/placeShape';
import regionShape from './../../../config/shapes/mapShape';
import { fetchNearyPlaces } from './../../../actions/PlaceActions';
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
  }

  getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      return null;
    }

    return Location.getCurrentPositionAsync({});
  }

  render() {
    const { places } = this.props;

    return (
      <MapView
        ref={(map) => { this.map = map; }}
        style={styles.map}
        showsUserLocation
      >
        {
          places.map(place => (
            <MapView.Marker
              key={place.id}
              centerOffset={{ x: -0.5, y: -18 }}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            >
              <Image source={pin} style={{ width: 30, height: 45 }} />
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
  fetchNearyPlaces: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  region: state.map.region,
  isLoading: state.place.isLoading,
  places: state.place.places,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchNearyPlaces,
    setRegion,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);