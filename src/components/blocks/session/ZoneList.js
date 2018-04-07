import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, View } from 'react-native';

import Zone from './Zone';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    flexBasis: '50%',
  },
});

class ZoneList extends React.PureComponent {
  render() {
    const { zones, selectedZoneId, onSelect } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {
          zones.map(zone => (
            <View style={styles.item} key={zone.id}>
              <Zone zone={zone} selected={selectedZoneId === zone.id} onSelect={() => onSelect(zone.id)} />
            </View>
          ))
        }
      </ScrollView>
    );
  }
}

ZoneList.propTypes = {
  zones: PropTypes.arrayOf(PropTypes.shape({})),
  selectedZoneId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

ZoneList.defaultProps = {
  zones: [],
  selectedZoneId: null,
};

export default ZoneList;
