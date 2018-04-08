import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';

import { fetchPlace } from './../../actions/PlaceActions';
import placeShape from './../../config/shapes/placeShape';
import sessionShape from './../../config/shapes/sessionShape';

import Countdown from './../../components/blocks/session/Coundown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class CurrentSession extends React.PureComponent {
  componentDidMount() {
    if (this.props.currentSession && !this.props.place) {
      this.props.fetchPlace(this.props.currentSession.place_id);
    }
  }

  render() {
    const { currentSession, place } = this.props;

    if (currentSession) {
      return (
        <View style={styles.container}>
          <View>
            {
              place ?
                <View>
                  <Text>Place</Text>
                  <Text>{ place.name }</Text>
                </View>
                : null
            }
          </View>
          <Countdown start={currentSession.created_at} end={currentSession.end_at} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>You have no running session.</Text>
      </View>
    );
  }
}

CurrentSession.propTypes = {
  currentSession: PropTypes.shape(sessionShape),
  place: PropTypes.shape(placeShape),
  fetchPlace: PropTypes.func.isRequired,
};

CurrentSession.defaultProps = {
  currentSession: null,
  place: null,
};

const mapStateToProps = state => ({
  currentSession: state.session.currentSession,
  place: state.place.places.find(place => place.id === state.session.currentSession.place_id),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPlace,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSession);
