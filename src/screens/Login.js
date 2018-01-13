import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});
