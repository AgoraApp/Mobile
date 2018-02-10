import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Pulse } from 'react-native-loader';

import { MAIN_COLOR } from './../../../config/colors';
import { updateUser } from './../../../actions/UserActions';
import { disableEditMode } from './../../../actions/ProfileActions';

import Button from './../Button';

import Icon from './../Icon';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button: {
    marginHorizontal: 10,
  },

  text: {
    marginLeft: 5,
    color: '#FFFFFF',
  },

  cancelButton: {
    marginRight: 10,
  },
});

class SaveButton extends React.PureComponent {
  handleSave = () => {
    this.props.updateUser(
      this.props.firstName,
      this.props.lastName,
      this.props.expertise,
      this.props.avatar,
    );
  }

  handleCancel = () => {
    this.props.disableEditMode();
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button onPress={() => this.handleCancel()} color={MAIN_COLOR} style={styles.button}>
          <Icon name="cancel" size={20} color="white" />
          <Text style={styles.text}>Cancel</Text>
        </Button>
        <Button onPress={() => this.handleSave()} color={MAIN_COLOR}>
          <Icon name="save" size={20} color="white" />
          <Text style={styles.text}>Save</Text>
          {
            this.props.isLoading ?
              <Pulse size={10} color="#FFFFFF" />
              : null
          }
        </Button>
      </View>
    );
  }
}

SaveButton.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  expertise: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  disableEditMode: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.profile.firstName,
  lastName: state.profile.lastName,
  expertise: state.profile.expertise,
  avatar: state.profile.avatar,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    disableEditMode,
    updateUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
