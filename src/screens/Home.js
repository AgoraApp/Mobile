import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

const Home = () => (
  <View style={styles.container}>
    <Text>Home</Text>
  </View>
);

export default Home;
