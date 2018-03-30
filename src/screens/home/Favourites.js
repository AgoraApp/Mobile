import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Favourites extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Favourites</Text>
      </View>
    );
  }
}

export default Favourites;
