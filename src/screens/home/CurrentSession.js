import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

import { MAIN_COLOR, ALERT_COLOR } from './../../config/colors';
import placeShape from './../../config/shapes/placeShape';
import sessionShape from './../../config/shapes/sessionShape';

import { fetchPlace } from './../../actions/PlaceActions';
import { stopSession, removeCurrentSessions, openUpdateZone, openUpdateDuration } from './../../actions/SessionActions';

import Button from './../../components/blocks/Button';
import Description from './../../components/blocks/session/Description';
import Countdown from './../../components/blocks/session/Countdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  emptyContainer: {
    justifyContent: 'center',
  },

  actionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  updateButton: {
    marginHorizontal: 10,
  },

  deleteButton: {
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
  },

  emptyText: {
    color: 'rgba(0, 0, 0, 0.35)',
  },
});

class CurrentSession extends React.PureComponent {
  componentDidMount() {
    if (this.props.currentSession && !this.props.place) {
      this.props.fetchPlace(this.props.currentSession.place_id);
    }
  }

  handleDone = () => {
    this.props.removeCurrentSessions();
  }

  handleOpenUpdateDuration = () => {
    const now = moment();
    const end = moment(this.props.currentSession.end_at);

    const reaminingDuration = end.diff(now, 'seconds');

    this.props.openUpdateDuration(reaminingDuration);
  }

  render() {
    const { currentSession, place } = this.props;

    if (currentSession) {
      return (
        <View style={styles.container}>
          <Description
            currentSession={currentSession}
            place={place}
            zoneId={currentSession.zone_id}
          />
          <Countdown
            start={currentSession.created_at}
            end={currentSession.end_at}
            onDone={this.handleDone}
          />
          <View style={styles.actionsContainer}>
            <Button
              style={styles.updateButton}
              color={MAIN_COLOR}
              onPress={() => this.props.openUpdateZone(currentSession.zone_id)}
            >
              <Text style={styles.buttonText}>Change the zone</Text>
            </Button>
            <Button
              style={styles.updateButton}
              color={MAIN_COLOR}
              onPress={this.handleOpenUpdateDuration}
            >
              <Text style={styles.buttonText}>Change the duration</Text>
            </Button>
          </View>
          <Button
            style={styles.deleteButton}
            color={ALERT_COLOR}
            onPress={() => this.props.stopSession(currentSession.id)}
          >
            <Text style={styles.buttonText}>Stop this session</Text>
          </Button>
        </View>
      );
    }

    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>You have no running session.</Text>
      </View>
    );
  }
}

CurrentSession.propTypes = {
  currentSession: PropTypes.shape(sessionShape),
  place: PropTypes.shape(placeShape),
  fetchPlace: PropTypes.func.isRequired,
  stopSession: PropTypes.func.isRequired,
  removeCurrentSessions: PropTypes.func.isRequired,
  openUpdateZone: PropTypes.func.isRequired,
  openUpdateDuration: PropTypes.func.isRequired,
};

CurrentSession.defaultProps = {
  currentSession: null,
  place: null,
};

const mapStateToProps = state => ({
  currentSession: state.session.currentSession,
  place: state.session.currentSession ?
    state.place.places.find(place => place.id === state.session.currentSession.place_id)
    : null,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchPlace,
    stopSession,
    removeCurrentSessions,
    openUpdateZone,
    openUpdateDuration,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSession);
