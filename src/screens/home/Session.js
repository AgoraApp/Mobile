import React from 'react';
import { StyleSheet, View } from 'react-native';

import SessionButton from '../../components/blocks/home/SessionButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


});

class Session extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SessionButton />
      </View>
    );
  }
}

export default Session;
