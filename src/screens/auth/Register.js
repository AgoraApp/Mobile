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

import { register, resetErrors } from './../../actions/UserActions';

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

class Register extends React.Component {
  constructor() {
    super();

    this.firstNameInputReference = null;

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.firstNameInputReference.focus();
    }

    if (prevProps.isVisible && !this.props.isVisible) {
      Keyboard.dismiss();
      this.props.resetErrors();
    }
  }

  handleRegister = () => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    this.props.register(firstName, lastName, email, password);
  }

  render() {
    const { isLoading, errors } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(input) => { this.firstNameInputReference = input; }}
            style={[styles.input, { borderColor: errors && errors.first_name ? ALERT_COLOR : 'transparent' }]}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="First name"
            value={firstName}
            onChangeText={value => this.setState({ firstName: value })}
          />
          {
            errors && errors.first_name ?
              <Text style={styles.errorText}>{ errors.first_name }</Text>
              : null
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: errors && errors.last_name ? ALERT_COLOR : 'transparent' }]}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Last name"
            value={lastName}
            onChangeText={value => this.setState({ lastName: value })}
          />
          {
            errors && errors.last_name ?
              <Text style={styles.errorText}>{ errors.last_name }</Text>
              : null
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
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
          onPress={this.handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
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

Register.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}),
  register: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

Register.defaultProps = {
  errors: null,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
  errors: state.user.errors,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    register,
    resetErrors,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);