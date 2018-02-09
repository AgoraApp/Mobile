import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { enableEditMode, disableEditMode } from './../../../actions/ProfileActions';

import Icon from './../Icon';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    marginLeft: 5,
    color: '#FFFFFF',
  },

  cancelButton: {
    marginRight: 10,
  },
});

class EditModeButton extends React.PureComponent {
  handleEdit = () => {
    this.props.enableEditMode({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      expertise: this.props.expertise,
      avatar: this.props.avatar,
    });
  }

  handleSave = () => {

  }

  handleCancel = () => {
    this.props.disableEditMode();
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.handleEdit()} style={styles.button}>
        <Icon name="edit" size={20} color="white" />
        <Text style={styles.text}>Edit</Text>
      </TouchableOpacity>
    );
  }
}

EditModeButton.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  expertise: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  enableEditMode: PropTypes.func.isRequired,
  disableEditMode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  expertise: state.user.expertise,
  avatar: state.user.avatar,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    enableEditMode,
    disableEditMode,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditModeButton);
