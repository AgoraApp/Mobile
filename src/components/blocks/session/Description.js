import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

import sessionShape from './../../../config/shapes/sessionShape';
import placeShape from './../../../config/shapes/placeShape';

import Icon from './../Icon';
import Countdown from './Coundown';

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },

  item: {
    marginBottom: 20,
    alignItems: 'center',
  },

  actionContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },

  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressIcon: {
    marginRight: 5,
  },

  address: {
    fontSize: 10,
  },

  button: {
    paddingVertical: 15,
    paddingHorizontal: 35,
  },

  buttonText: {
    color: '#FFFFFF',
  },
});

class Description extends React.PureComponent {
  render() {
    const { currentSession, place, zoneId } = this.props;

    if (place) {
      const selectedZone = place.zones.find(zone => zone.id === zoneId);

      return (
        <View style={styles.container}>
          <View style={styles.item}>
            <Text style={styles.title}>Place</Text>
            <Text>{ place.name }</Text>
            <View style={styles.addressContainer}>
              <Icon style={styles.addressIcon} name="address" size={10} color="#000000" />
              <Text style={styles.address}>{ place.address }</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Zone</Text>
            <Text>{ selectedZone.name }</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Started</Text>
            <Text>{ moment(currentSession.created_at).format('L LT') }</Text>
          </View>
          <View style={styles.item}>
            <Countdown start={currentSession.created_at} end={currentSession.end_at} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
      </View>
    );
  }
}

Description.propTypes = {
  currentSession: PropTypes.shape(sessionShape).isRequired,
  place: PropTypes.shape(placeShape),
  zoneId: PropTypes.number.isRequired,
};

Description.defaultProps = {
  place: {},
};

export default Description;
