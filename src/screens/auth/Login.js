import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Pulse } from 'react-native-loader';

import { MAIN_COLOR, SECONDARY_COLOR, ALERT_COLOR } from './../../config/colors';

import { login, resetErrors } from './../../actions/UserActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inputContainer: {
    marginBottom: 15,
  },

  input: {
    alignItems: 'center',
    width: 250,
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    color: MAIN_COLOR,
  },

  errorText: {
    marginTop: 5,
    color: '#FFFFFF',
    textAlign: 'center',
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

    this.emailInputReference = null;

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.emailInputReference.focus();
    }

    if (prevProps.isVisible && !this.props.isVisible) {
      Keyboard.dismiss();
      this.props.resetErrors();
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;

    this.props.login(email, password);
  }

  render() {
    const { isLoading, errors } = this.props;
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(input) => { this.emailInputReference = input; }}
            style={[styles.input, { borderColor: errors && errors.email ? ALERT_COLOR : 'transparent' }]}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            value={email}
            onChangeText={value => this.setState({ email: value })}
          />
          {
            errors && errors.email ?
              <Text style={styles.errorText}>{ errors.email }</Text>
              : null
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: errors && errors.password ? ALERT_COLOR : 'transparent' }]}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={value => this.setState({ password: value })}
          />
          {
            errors && errors.password ?
              <Text style={styles.errorText}>{ errors.password }</Text>
              : null
          }
        </View>
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
        {
          errors && errors.form ?
            <Text style={styles.errorText}>{ errors.form }</Text>
            : null
        }
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
  errors: PropTypes.shape({}),
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

Login.defaultProps = {
  errors: null,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  errors: state.user.errors,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
    resetErrors,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
