import React from 'react';
import { StyleSheet, View } from 'react-native';

import RootTabRouter from './../../navigation/RootTabNavigation';
import Session from './Session';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Root extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RootTabRouter />
        <Session />
      </View>
    )
  }
}

export default Root;
