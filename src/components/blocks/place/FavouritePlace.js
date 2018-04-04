import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import placeShape from './../../../config/shapes/placeShape';

import FavouritePlaceHeader from './FavouritePlaceHeader';
import FavouritePlaceContent from './FavouritePlaceContent';

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
});

class FavouritePlace extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      collapsed: true,
    };
  }

  handlePress = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { place, expandedPlaceId } = this.props;

    return (
      <View style={styles.container}>
        <FavouritePlaceHeader place={place} />
        <Collapsible collapsed={place.id !== expandedPlaceId}>
          <FavouritePlaceContent place={place} />
        </Collapsible>
      </View>
    );
  }
}

FavouritePlace.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  expandedPlaceId: PropTypes.number,
};

FavouritePlace.defaultProps = {
  expandedPlaceId: null,
};

const mapStateToProps = state => ({
  expandedPlaceId: state.place.expandedFavouritePlaceId,
});

export default connect(mapStateToProps, null)(FavouritePlace);
