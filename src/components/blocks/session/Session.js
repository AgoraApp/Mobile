import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

import { SECONDARY_COLOR, TERTIARY_COLOR } from '../../../config/colors';
import sessionShape from './../../../config/shapes/sessionShape';
import { secondsToHoursAndMinutes } from './../../../helpers/generalHelpers';

import Icon from './../Icon';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
    marginBottom: 10,
  },

  header: {
    position: 'absolute',
    left: -15,
    flexDirection: 'row',
  },

  dateContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
  },

  date: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },

  contentContainer: {
    marginTop: 30,
    marginLeft: 15,
  },

  item: {
    marginBottom: 5,
  },

  title: {
    fontWeight: 'bold',
  },

  icon: {
    marginRight: 5,
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressIcon: {
    marginRight: 5,
  },

  addressText: {
    fontSize: 10,
  },
});

class Session extends React.PureComponent {
  renderDuration = () => {
    const { session } = this.props;

    const start = moment(session.created_at);
    const end = moment(session.deleted_at);

    const totalDuration = end.diff(start, 'seconds');
    const { hours, minutes } = secondsToHoursAndMinutes(totalDuration);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (hours > 0) {
      return formattedMinutes > 0 ? `${hours}h ${formattedMinutes}min` : `${hours}h`;
    }

    return formattedMinutes > 0 ? `${minutes} minutes` : '< 1 minute';
  }

  render() {
    const { session } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={[styles.dateContainer, {
              backgroundColor: session.deleted_at ? TERTIARY_COLOR : SECONDARY_COLOR,
            }]}
          >
            <Text style={styles.date}>{ moment(session.created_at).format('HH:mm') }</Text>
          </View>
          {
            session.deleted_at ?
              <View style={styles.timeContainer}>
                <Icon style={styles.icon} name="current_session" size={12} color="#000000" />
                <Text>{ this.renderDuration() }</Text>
              </View>
              :
              <View style={styles.timeContainer}>
                <Text>Current session</Text>
              </View>
          }
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.item}>
            <Text style={styles.title}>{ session.place.name }</Text>
            <View style={styles.address}>
              <Icon style={styles.addressIcon} name="address" size={10} color="#000000" />
              <Text style={styles.addressText}>{ `${session.place.address}, ${session.place.zip_code} ${session.place.city}` }</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Session.propTypes = {
  session: PropTypes.shape(sessionShape).isRequired,
};

export default Session;
