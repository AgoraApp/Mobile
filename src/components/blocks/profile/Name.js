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

  inputContainer: {
    flexDirection: 'row',
  },

  input: {
    alignItems: 'center',
    width: 150,
    height: 47,
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    marginHorizontal: 10,
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="First name"
            value={editableFirstName}
            onChangeText={value => this.props.setFirstName(value)}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="Last name"
            value={editableLastName}
            onChangeText={value => this.props.setLastName(value)}
          />
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.userName}>{ firstName } { lastName }</Text>
      </View>
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
