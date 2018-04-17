import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import placeShape from './../../config/shapes/placeShape';

import { fetchFavouritePlaces } from './../../actions/PlaceActions';

import FavouritePlace from '../../components/blocks/place/FavouritePlace';
import FavouritePlaceSkeleton from '../../components/blocks/place/FavouritePlaceSkeleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: 'rgba(0, 0, 0, 0.35)',
  },
});

class Favourites extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFavouritePlaces();
  }

  render() {
    const { places, isFavouritesLoading } = this.props;

    if (isFavouritesLoading) {
      return (
        <View style={styles.container}>
          {
            [0, 1, 2].map((key, index) => (
              <FavouritePlaceSkeleton key={key} index={index} />
            ))
          }
        </View>
      );
    }

    if (places.length > 0) {
      return (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {
            places.map((place, index) => (
              <FavouritePlace key={place.id} index={index} place={place} />
            ))
          }
        </ScrollView>
      );
    }

    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>You have no favourite places.</Text>
      </View>
    );
  }
}

Favourites.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(placeShape)),
  isFavouritesLoading: PropTypes.bool.isRequired,
  fetchFavouritePlaces: PropTypes.func.isRequired,
};

Favourites.defaultProps = {
  places: [],
};

const mapStateToProps = state => ({
  places: state.place.places.filter(place => state.user.favourites.includes(place.id)),
  isFavouritesLoading: state.place.isFavouritesLoading,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchFavouritePlaces,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
