import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { enableEditMode, disableEditMode } from './../../../actions/ProfileActions';

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

class EditModeButton extends React.PureComponent {
  handleEdit = () => {
    if (this.props.isEditMode) {
      this.props.disableEditMode();
    } else {
      this.props.enableEditMode();
    }
  }

  renderButtonContent = () => {
    if (this.props.isEditMode) {
      return (
        <View style={styles.button}>
          <Icon name="save" size={20} color="white" />
          <Text style={styles.text}>Save</Text>
        </View>
      );
    }

    return (
      <View style={styles.button}>
        <Icon name="edit" size={20} color="white" />
        <Text style={styles.text}>Edit</Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.handleEdit()}>
        { this.renderButtonContent() }
      </TouchableOpacity>
    );
  }
}

EditModeButton.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  enableEditMode: PropTypes.func.isRequired,
  disableEditMode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isEditMode: state.profile.isEditMode,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    enableEditMode,
    disableEditMode,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditModeButton);
