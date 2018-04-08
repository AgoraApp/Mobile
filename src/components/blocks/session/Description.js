import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Svg } from 'expo';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import moment from 'moment';

import sessionShape from './../../../config/shapes/sessionShape';
import placeShape from './../../../config/shapes/placeShape';

import Icon from './../Icon';

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
        </View>
      );
    }

    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <SvgAnimatedLinearGradient height={55} width={width}>
            <Svg.Rect x={(width / 2) - 50} y="0" width="100" height="16" />
            <Svg.Rect x={(width / 2) - 75} y="26" width="150" height="14" />
            <Svg.Rect x={(width / 2) - 50} y="45" width="100" height="10" />
          </SvgAnimatedLinearGradient>
        </View>
        <View style={styles.item}>
          <SvgAnimatedLinearGradient height={40} width={width}>
            <Svg.Rect x={(width / 2) - 35} y="0" width="70" height="16" />
            <Svg.Rect x={(width / 2) - 60} y="26" width="120" height="14" />
          </SvgAnimatedLinearGradient>
        </View>
        <View style={styles.item}>
          <SvgAnimatedLinearGradient height={40} width={width}>
            <Svg.Rect x={(width / 2) - 45} y="0" width="90" height="16" />
            <Svg.Rect x={(width / 2) - 70} y="26" width="140" height="14" />
          </SvgAnimatedLinearGradient>
        </View>
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
