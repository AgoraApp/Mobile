import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';
import zoneShape from './../../../config/shapes/zoneShape';
import { secondsToHoursAndMinutes } from './../../../helpers/generalHelpers';

import Icon from './../Icon';
import Button from '../Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  item: {
    marginBottom: 15,
    alignItems: 'center',
  },

  actionContainer: {
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
    paddingVertical: 10,
    paddingHorizontal: 25,
  },

  buttonText: {
    color: '#FFFFFF',
  },
});

class Validation extends React.PureComponent {
  renderDuration() {
    const { hours, minutes } = secondsToHoursAndMinutes(this.props.duration);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}h ${formattedMinutes}min`;
  }

  render() {
    const { place, zone, onValidate } = this.props;

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
          <Text>{ zone.name }</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Duration</Text>
          <Text>{ this.renderDuration() }</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            style={styles.button}
            color={MAIN_COLOR}
            onPress={onValidate}
          >
            <Text style={styles.buttonText}>Create the session</Text>
          </Button>
        </View>
      </View>
    );
  }
}

Validation.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  zone: PropTypes.shape(zoneShape),
  duration: PropTypes.number.isRequired,
  onValidate: PropTypes.func.isRequired,
};

Validation.defaultProps = {
  zone: {},
};

export default Validation;
