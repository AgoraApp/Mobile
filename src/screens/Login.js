import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, Text } from 'react-native';

import { MAIN_COLOR, SECONDARY_COLOR } from './../config/colors';
import splashImage from './../../assets/splash.png';

import { login } from './../actions/UserActions';

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
    bottom: 50,
  },

  input: {
    flex: 1,
    alignItems: 'center',
    width: 250,
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    color: MAIN_COLOR,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    width: 250,
    padding: 15,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
  },

  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;

    this.props.login(email, password);
  }

  render() {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} resizeMode="contain" source={splashImage}>
          <View style={styles.overlayContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              value={email}
              onChangeText={value => this.setState({ email: value })}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              placeholder="Mot de passe"
              value={password}
              onChangeText={value => this.setState({ password: value })}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleLogin}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(Login);
