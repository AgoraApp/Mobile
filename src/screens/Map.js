import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

import { fetchNearyPlaces } from './../actions/PlaceActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

class Map extends React.Component {
  componentDidMount() {
    if (!this.props.isLoading && this.props.places.length === 0) {
      this.getCurrentLocation()
        .then((location) => {
          if (location) {
            this.props.fetchNearyPlaces(location.coords.latitude, location.coords.longitude);
          }
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
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation
          followsUserLocation
        >
          {
            places.map(place => (
              <MapView.Marker
                key={place.id}
                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              />
            ))
          }
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchNearyPlaces: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.place.isLoading,
  places: state.place.places,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchNearyPlaces,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
