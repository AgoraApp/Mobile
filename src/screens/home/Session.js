import React from 'react';
import { StyleSheet, View } from 'react-native';

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
      </View>
    );
  }
}

export default Session;
