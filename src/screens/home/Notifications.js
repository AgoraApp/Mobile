import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Notifications extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default Notifications;
