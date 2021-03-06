import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';

import { setExpertise } from './../../../actions/ProfileActions';

import Tag from './../Tag';

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    width: 320,
    height: 51,
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: MAIN_COLOR,
  },

  placeholder: {
    marginHorizontal: 25,
    marginBottom: 3,
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    fontWeight: 'bold',
  },

  emptyText: {
    color: '#FFFFFF',
  },
});

class Expertise extends React.PureComponent {
  render() {
    const { isEditMode, expertise, editableExpertise } = this.props;

    if (isEditMode) {
      return (
        <View>
          <Text style={styles.placeholder}>Expertise</Text>
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
        {
          expertise.length > 0 ?
            <Tag text={expertise.toUpperCase()} size="small" />
            :
            <Tag text="No expertise" size="small" />
        }
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
