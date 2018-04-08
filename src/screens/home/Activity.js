import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, ScrollView, View } from 'react-native';
import moment from 'moment';

import sessionShape from './../../config/shapes/sessionShape';

import { fetchSessions } from './../../actions/SessionActions';

import SessionSkeleton from './../../components/blocks/session/SessionSkeleton';
import SessionDay from './../../components/blocks/session/SessionDay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Activity extends React.PureComponent {
  componentDidMount() {
    this.props.fetchSessions();
  }

  formatSessions = () => {
    const { sessions } = this.props;
    const sessionsByDate = {};

    sessions.forEach((session) => {
      const date = moment(session.created_at).format('YYYY-MM-DD');

      if (sessionsByDate[date]) {
        sessionsByDate[date].push(session);
      } else {
        sessionsByDate[date] = [session];
      }
    });

    return sessionsByDate;
  }

  render() {
    const { isSessionsLoading } = this.props;

    if (isSessionsLoading) {
      return (
        <View style={styles.container}>
          {
            [0, 1, 2].map((key, index) => (
              <SessionSkeleton key={key} index={index} />
            ))
          }
        </View>
      );
    }

    const sessionsByDate = this.formatSessions();
    const orderedSessionsByDateKeys = Object.keys(sessionsByDate).sort((a, b) => (
      new Date(b) - new Date(a)
    ));

    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {
          orderedSessionsByDateKeys.map((key, index) => (
            <SessionDay key={key} index={index} date={key} sessions={sessionsByDate[key]} />
          ))
        }
      </ScrollView>
    );
  }
}

Activity.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape(sessionShape)),
  isSessionsLoading: PropTypes.bool.isRequired,
  fetchSessions: PropTypes.func.isRequired,
};

Activity.defaultProps = {
  sessions: [],
};

const mapStateToProps = state => ({
  sessions: state.session.sessions,
  isSessionsLoading: state.session.isSessionsLoading,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchSessions,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
