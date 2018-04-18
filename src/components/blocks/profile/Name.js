import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';

import { setFirstName, setLastName } from './../../../actions/ProfileActions';

const styles = StyleSheet.create({
  userName: {
    color: MAIN_COLOR,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  editContainer: {
    flexDirection: 'row',
  },

  inputContainer: {
    width: 150,
    marginBottom: 15,
    marginHorizontal: 10,
  },

  placeholder: {
    marginHorizontal: 15,
    marginBottom: 3,
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    fontWeight: 'bold',
  },

  input: {
    height: 51,
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    color: MAIN_COLOR,
  },
});

class Name extends React.PureComponent {
  render() {
    const {
      isEditMode,
      firstName,
      lastName,
      editableFirstName,
      editableLastName,
    } = this.props;

    if (isEditMode) {
      return (
        <View style={styles.editContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>First name</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="First name"
              value={editableFirstName}
              onChangeText={value => this.props.setFirstName(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Last name</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Last name"
              value={editableLastName}
              onChangeText={value => this.props.setLastName(value)}
            />
          </View>
        </View>
      );
    }

    return (
      <Text style={styles.userName}>{ firstName } { lastName }</Text>
    );
  }
}

Name.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  editableFirstName: PropTypes.string.isRequired,
  editableLastName: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  isEditMode: state.profile.isEditMode,
  editableFirstName: state.profile.firstName,
  editableLastName: state.profile.lastName,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setFirstName,
    setLastName,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Name);
