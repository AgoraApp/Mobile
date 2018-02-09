import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';
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
        </Button>
      </View>
    );
  }
}

SaveButton.propTypes = {
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
    disableEditMode,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
