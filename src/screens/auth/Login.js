import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { DoubleBounce } from 'react-native-loader';

import { MAIN_COLOR, SECONDARY_COLOR } from './../../config/colors';
import splashImage from './../../../assets/splash.png';

import { login } from './../../actions/UserActions';

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

  loader: {
    position: 'absolute',
    right: 25,
    top: 15,
    backgroundColor: 'transparent',
  },
});

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      keyboardIsVisible: false,
    };
  }

  componentWillMount() {
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', this.handleKeyboardWillShow);
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', this.handleKeyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }

  handleKeyboardWillShow = () => {
    this.setState({ keyboardIsVisible: true });
  };

  handleKeyboardWillHide = () => {
    this.setState({ keyboardIsVisible: false });
  };

  handleLogin = () => {
    const { email, password } = this.state;

    this.props.login(email, password);
  }

  render() {
    const { isLoading } = this.props;
    const { email, password, keyboardIsVisible } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} resizeMode="contain" source={splashImage} blurRadius={keyboardIsVisible ? 10 : 0}>
          <KeyboardAvoidingView
            style={styles.overlayContainer}
            behavior="position"
            keyboardVerticalOffset={25}
          >
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
              {
                isLoading ?
                  <View style={styles.loader}><DoubleBounce size={10} color="#FFFFFF" /></View>
                  : null
              }
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
