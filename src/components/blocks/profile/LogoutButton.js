import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { logout } from './../../../actions/UserActions';

import Icon from './../Icon';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    marginLeft: 5,
    color: '#FFFFFF',
  },
});

class LogoutButton extends React.PureComponent {
  handleLogout = () => {
    this.props.logout();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.handleLogout()}
      >
        <Icon name="logout" size={20} color="white" />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    );
  }
}

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logout,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(LogoutButton);
