import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { SECONDARY_COLOR, COLOR_GREY, FONT_COLOR } from './../../../config/colors';

import Button from './../Button';
import Tag from './../Tag';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  zoneContainer: {
    marginBottom: 15,
  },
});

class SelectZone extends React.PureComponent {
  renderSelectedZone = () => {
    const { zones, selectedZoneId } = this.props;
    const selectedZone = zones.find(zone => zone.id === selectedZoneId);

    if (!selectedZone) {
      return (
        <Tag
          text="No zone selected"
          color={COLOR_GREY}
          fontColor={FONT_COLOR}
          size="large"
        />
      );
    }

    return (
      <Tag
        text={selectedZone.name}
        color={SECONDARY_COLOR}
        fontColor="#FFFFFF"
        size="large"
      />
    );
  }

  render() {
    const { zones, onPress, style } = this.props;

    if (zones.length === 0) {
      return null;
    }

    return (
      <View style={[style, styles.container]}>
        <View style={styles.zoneContainer}>
          { this.renderSelectedZone() }
        </View>
        <Button onPress={onPress}>
          <Text>Select a zone</Text>
        </Button>
      </View>
    );
  }
}

SelectZone.propTypes = {
  zones: PropTypes.arrayOf(PropTypes.shape({})),
  selectedZoneId: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  onPress: PropTypes.func.isRequired,
};

SelectZone.defaultProps = {
  zones: [],
  selectedZoneId: null,
  style: {},
};

export default SelectZone;
