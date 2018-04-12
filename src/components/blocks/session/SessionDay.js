import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

import { MAIN_COLOR } from '../../../config/colors';
import sessionShape from './../../../config/shapes/sessionShape';

import Session from './Session';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
  },

  sessionsContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderLeftWidth: 5,
    borderLeftColor: MAIN_COLOR,
  },
});

class SessionDay extends React.PureComponent {
  render() {
    const { index, sessions, date } = this.props;

    const orderedSessions = sessions.sort((a, b) => (
      moment(b.created_at).diff(a.created_at)
    ));

    return (
      <View style={[styles.container, { marginTop: index === 0 ? 10 : 0 }]}>
        <Text style={styles.title}>{ moment(date).format('dddd, MMMM D') }</Text>
        <View style={styles.sessionsContainer}>
          {
            orderedSessions.map(session => (
              <Session key={session.id} session={session} />
            ))
          }
        </View>
      </View>
    );
  }
}

SessionDay.propTypes = {
  index: PropTypes.number.isRequired,
  date: PropTypes.string,
  sessions: PropTypes.arrayOf(PropTypes.shape(sessionShape)),
};

SessionDay.defaultProps = {
  date: '',
  sessions: [],
};

export default SessionDay;
