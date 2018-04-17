import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';

import { MAIN_COLOR, SECONDARY_COLOR } from './../../config/colors';
import { wait } from '../../helpers/generalHelpers';

import splashImage from './../../../assets/splash.png';

import Login from './Login';
import Register from './Register';

const DEVICE_HEIGHT = Dimensions.get('window').height;

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

  overlayContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    width: '100%',
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

class Auth extends React.Component {
  constructor() {
    super();

    this.navigationTop = new Animated.Value(DEVICE_HEIGHT);
    this.loginTop = new Animated.Value(DEVICE_HEIGHT);
    this.registerTop = new Animated.Value(DEVICE_HEIGHT);
    this.backgroundOpacity = new Animated.Value(1);

    this.state = {
      page: '',
    };
  }

  componentDidMount() {
    this.showNavigation(500).start();
  }

  showNavigation = time => (
    Animated.parallel([
      Animated.spring(this.navigationTop, {
        toValue: DEVICE_HEIGHT * 0.75,
        duration: time,
      }),
      Animated.timing(this.backgroundOpacity, {
        toValue: 1,
        duration: time,
      }),
    ])
  )

  hideNavigation = time => (
    Animated.parallel([
      Animated.spring(this.navigationTop, {
        toValue: DEVICE_HEIGHT,
        duration: time,
      }),
      Animated.timing(this.backgroundOpacity, {
        toValue: 0,
        duration: time,
      }),
    ])
  )

  hideLogin = async () => {
    this.setState({ page: '' });

    Animated.spring(this.loginTop, {
      toValue: DEVICE_HEIGHT,
      duration: 500,
    }).start();

    await wait(550);

    this.showNavigation(300).start();
  }

  showLogin = async () => {
    this.hideNavigation(300).start();

    await wait(350);

    Animated.spring(this.loginTop, {
      toValue: 0,
      duration: 500,
    }).start();

    await wait(550);

    this.setState({ page: 'login' });
  }

  hideRegister = async () => {
    this.setState({ page: '' });

    Animated.spring(this.registerTop, {
      toValue: DEVICE_HEIGHT,
      duration: 500,
    }).start();

    await wait(550);

    this.showNavigation(300).start();
  }

  showRegister = async () => {
    this.hideNavigation(300).start();

    await wait(350);

    Animated.spring(this.registerTop, {
      toValue: 0,
      duration: 500,
    }).start();

    await wait(550);

    this.setState({ page: 'register' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{ flex: 1, opacity: this.backgroundOpacity }}>
          <ImageBackground style={styles.background} resizeMode="contain" source={splashImage} />
        </Animated.View>
        <Animated.View style={[styles.overlayContainer, { top: this.navigationTop }]}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={this.showLogin}
          >
            <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={this.showRegister}
          >
            <Text style={[styles.buttonText, styles.registerButtonText]}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.overlayContainer, { top: this.loginTop }]}>
          <Login
            isVisible={this.state.page === 'login'}
            onBack={this.hideLogin}
          />
        </Animated.View>
        <Animated.View style={[styles.overlayContainer, { top: this.registerTop }]}>
          <Register
            isVisible={this.state.page === 'register'}
            onBack={this.hideRegister}
          />
        </Animated.View>
      </View>
    );
  }
}

export default Auth;
