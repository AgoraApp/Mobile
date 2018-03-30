import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, ScrollView } from 'react-native';

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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        { places.map(place => <FavouritePlace key={place.id} place={place} />) }
      </ScrollView>
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
  places: state.place.places.filter(place => state.user.favourites.includes(place.id)),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchFavouritePlaces,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
