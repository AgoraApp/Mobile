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

import { MAIN_COLOR, SECONDARY_COLOR } from './../../config/colors';

import { register } from './../../actions/UserActions';

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
    }
  }

  handleLogin = () => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    this.props.register(firstName, lastName, email, password);
  }

  render() {
    const { isLoading } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          ref={(input) => { this.firstNameInputReference = input; }}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="First name"
          value={firstName}
          onChangeText={value => this.setState({ firstName: value })}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholder="Last name"
          value={lastName}
          onChangeText={value => this.setState({ lastName: value })}
        />
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
          placeholder="Password"
          value={password}
          onChangeText={value => this.setState({ password: value })}
        />
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
  register: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    register,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
