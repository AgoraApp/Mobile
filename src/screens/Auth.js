import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native';

import { MAIN_COLOR, SECONDARY_COLOR } from './../config/colors';
import splashImage from './../../assets/splash.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },

  background: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },

  buttonsContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    bottom: 100,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    width: 250,
    padding: 15,
    borderRadius: 25,
  },

  buttonText: {
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },

  loginButtonText: {
    color: MAIN_COLOR,
  },

  registerButton: {
    backgroundColor: SECONDARY_COLOR,
  },

  registerButtonText: {
    color: '#FFFFFF',
  },
});

const Auth = ({ navigation }) => (
  <View style={styles.container}>
    <ImageBackground style={styles.background} resizeMode="contain" source={splashImage}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.registerButtonText]}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

Auth.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

export default Auth;
