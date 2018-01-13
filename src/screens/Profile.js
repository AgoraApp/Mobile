import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

const Profile = () => (
  <View style={styles.container}>
    <Text>Profile</Text>
  </View>
);

export default Profile;
