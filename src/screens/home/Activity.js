import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Activity extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Activity</Text>
      </View>
    );
  }
}

export default Activity;
