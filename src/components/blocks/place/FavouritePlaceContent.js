import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';

import { fetchPlace } from './../../../actions/PlaceActions';

import CreateSessionButton from './../session/CreateSessionButton';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

class FavouritePlaceContent extends React.PureComponent {
  componentDidMount() {
    if (!this.props.place.zones) {
      this.props.fetchPlace(this.props.place.id);
    }
  }

  render() {
    const { place } = this.props;

    return (
      <View style={styles.container}>
        <Text>{ place.description }</Text>
        <CreateSessionButton place={place} />
      </View>
    );
  }
}

FavouritePlaceContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  fetchPlace: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPlace,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(FavouritePlaceContent);
