import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';

import { setExpertise } from './../../../actions/ProfileActions';

import Tag from './../Tag';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },

  input: {
    alignItems: 'center',
    width: 320,
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: MAIN_COLOR,
  },
});

class Expertise extends React.PureComponent {
  render() {
    const { isEditMode, expertise, editableExpertise } = this.props;

    if (isEditMode) {
      return (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="Expertise"
            value={editableExpertise}
            onChangeText={value => this.props.setExpertise(value)}
          />
        </View>
      );
    }

    return (
      <View>
        <Tag text={expertise.toUpperCase()} size="small" />
      </View>
    );
  }
}

Expertise.propTypes = {
  expertise: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  editableExpertise: PropTypes.string.isRequired,
  setExpertise: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  expertise: state.user.expertise,
  isEditMode: state.profile.isEditMode,
  editableExpertise: state.profile.expertise,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setExpertise,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Expertise);