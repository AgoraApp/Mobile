import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Pulse } from 'react-native-loader';

import { MAIN_COLOR, SECONDARY_COLOR } from './../../config/colors';

import { login } from './../../actions/UserActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  input: {
    alignItems: 'center',
    width: 250,
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    color: MAIN_COLOR,
  },

  button: {
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

  backButton: {
    marginVertical: 15,
    paddingVertical: 10,
  },

  backButtonText: {
    color: '#FFFFFF',
  },
});

class Login extends React.Component {
  constructor() {
    super();

    this.loginInputReference = null;

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.loginInputReference.focus();
    }

    if (prevProps.isVisible && !this.props.isVisible) {
      this.loginInputReference.blur();
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;

    this.props.login(email, password);
  }

  render() {
    const { isLoading } = this.props;
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          ref={(input) => { this.loginInputReference = input; }}
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
          placeholder="Password"
          value={password}
          onChangeText={value => this.setState({ password: value })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
          {
            isLoading ?
              <View style={styles.loader}>
                <Pulse size={10} color="#FFFFFF" />
              </View>
              : null
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.onBack()}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
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
