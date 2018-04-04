import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { QUATERNARY_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';

import { addFavouritePlace, removeFavouritePlace } from './../../../actions/UserActions';

import Icon from './../Icon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },

  label: {
    marginLeft: 5,
    fontSize: 12,
  },
});

class PlaceFavouriteButton extends React.PureComponent {
  handlePress = () => {
    const { place, favourites } = this.props;

    if (favourites.includes(place.id)) {
      this.props.removeFavouritePlace(place.id);
    } else {
      this.props.addFavouritePlace(place.id);
    }
  }

  render() {
    const { place, favourites } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Icon name={favourites.includes(place.id) ? 'favourites-filled' : 'favourites'} size={12} color={QUATERNARY_COLOR} />
        {
          favourites.includes(place.id) ?
            <Text style={styles.label}>Remove from favourites</Text>
            :
            <Text style={styles.label}>Add to favourites</Text>
        }
      </TouchableOpacity>
    );
  }
}

PlaceFavouriteButton.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.number),
  addFavouritePlace: PropTypes.func.isRequired,
  removeFavouritePlace: PropTypes.func.isRequired,
};

PlaceFavouriteButton.defaultProps = {
  favourites: [],
};

const mapStateToProps = state => ({
  favourites: state.user.favourites,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFavouritePlace,
    removeFavouritePlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceFavouriteButton);
