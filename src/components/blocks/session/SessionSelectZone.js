import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import SessionZone from './SessionZone';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

class SessionSelectZone extends React.PureComponent {
  render() {
    const { zones } = this.props;

    return (
      <View style={styles.container}>
        {
          zones.map(zone => (
            <SessionZone key={zone.id} zone={zone} />
          ))
        }
      </View>
    );
  }
}

SessionSelectZone.propTypes = {
  zones: PropTypes.arrayOf(PropTypes.shape({})),
};

SessionSelectZone.defaultProps = {
  zones: [],
};

export default SessionSelectZone;
