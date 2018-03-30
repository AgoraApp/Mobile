import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';

import placeShape from './../../config/shapes/placeShape';

import { fetchFavouritePlaces } from './../../actions/PlaceActions';
import FavouritePlace from '../../components/blocks/place/FavouritePlace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Favourites extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFavouritePlaces();
  }

  render() {
    const { places } = this.props;

    return (
      <View style={styles.container}>
        { places.map(place => <FavouritePlace key={place.id} place={place} />) }
      </View>
    );
  }
}

Favourites.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)),
  fetchFavouritePlaces: PropTypes.func.isRequired,
};

Favourites.defaultProps = {
  places: [],
};

const mapStateToProps = state => ({
  places: state.place.favourites,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchFavouritePlaces,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
