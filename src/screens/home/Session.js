import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Session extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Session</Text>
      </View>
    );
  }
}

export default Session;
