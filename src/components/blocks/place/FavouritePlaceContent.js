import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';
import sessionShape from './../../../config/shapes/sessionShape';

import { fetchPlace } from './../../../actions/PlaceActions';

import ViewSessionsButton from './../session/ViewSessionsButton';
import CreateSessionButton from './../session/CreateSessionButton';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
        <View style={[styles.actionsContainer, { justifyContent: this.props.currentSession ? 'center' : 'space-between' }]}>
          <ViewSessionsButton place={place} />
          {
            this.props.currentSession ?
              null
              : <CreateSessionButton place={place} />
          }
        </View>
      </View>
    );
  }
}

FavouritePlaceContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  currentSession: PropTypes.shape(sessionShape),
  fetchPlace: PropTypes.func.isRequired,
};

FavouritePlaceContent.defaultProps = {
  currentSession: null,
};

const mapStateToProps = state => ({
  currentSession: state.session.currentSession,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FavouritePlaceContent);
