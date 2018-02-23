import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, TextInput, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import debounce from 'lodash.debounce';

import { MAIN_COLOR, COLOR_GREY, FONT_COLOR, SECONDARY_COLOR } from './../../config/colors';
import navigationShape from './../../config/shapes/navigationShape';
import skillShape from './../../config/shapes/userShape';
import inputStyles from './../../styles/Input';

import { fetchSkillAutocomplete, resetAutocomplete } from './../../actions/SkillActions';
import { addSkill, removeSkill } from './../../actions/UserActions';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import Tag from './../../components/blocks/Tag';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: Constants.statusBarHeight,
  },

  actionsContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  buttonIcon: {
    marginRight: 10,
  },

  skillsList: {
    flex: 1,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
  },

  skillContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
});

class AddSkill extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      autoCompleteValue: '',
    };
  }

  componentWillUnmount() {
    this.props.resetAutocomplete();
  }

  handleInputChange = (value) => {
    this.setState({ autoCompleteValue: value });
    this.props.fetchSkillAutocomplete(value.replace(/\s*$/, ''));
  }

  handleSkillPress = (skill, userHasSkill) => {
    if (userHasSkill) {
      this.props.removeSkill(skill.id);
    } else {
      this.props.addSkill(skill.name);
    }
  }

  renderSkill = ({ item }) => {
    const userHasSkill = this.props.userSkills.find(skill => skill.name === item.name);

    return (
      <TouchableOpacity
        style={styles.skillContainer}
        onPress={() => this.handleSkillPress(item, userHasSkill)}
      >
        <Tag
          style={styles.tag}
          key={item.id}
          text={item.name}
          color={userHasSkill ? SECONDARY_COLOR : COLOR_GREY}
          fontColor={userHasSkill ? '#FFFFFF' : FONT_COLOR}
          size="large"
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { skills, hasNoResults, userSkills } = this.props;
    const { autoCompleteValue } = this.state;

    const formattedSkills = [...skills];
    const formattedAutoCompleteValue = autoCompleteValue.replace(/\s*$/, '').toLowerCase();

    const skillExists = skills.find(skill => (
      skill.name.toLowerCase() === formattedAutoCompleteValue
    ));

    if (!skillExists && (hasNoResults || skills.length > 0)) {
      formattedSkills.push({ id: `new-skill-${autoCompleteValue}`, name: autoCompleteValue });
    }

    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <Button
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon style={styles.buttonIcon} name="cancel" color={MAIN_COLOR} size={20} />
            <Text>Close</Text>
          </Button>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={55}
        >
          <TextInput
            style={inputStyles.input}
            autoCorrect={false}
            placeholder="Start typing a skill name..."
            onChangeText={debounce(this.handleInputChange, 300)}
          />
          <View style={styles.skillsList}>
            <FlatList
              data={formattedSkills}
              extraData={userSkills}
              keyExtractor={item => item.id}
              renderItem={this.renderSkill}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

AddSkill.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape(skillShape)).isRequired,
  hasNoResults: PropTypes.bool.isRequired,
  userSkills: PropTypes.arrayOf(PropTypes.shape(skillShape)).isRequired,
  navigation: PropTypes.shape(navigationShape).isRequired,
  fetchSkillAutocomplete: PropTypes.func.isRequired,
  resetAutocomplete: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  skills: state.skill.skills,
  hasNoResults: state.skill.hasNoResults,
  userSkills: state.user.skills,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchSkillAutocomplete,
    resetAutocomplete,
    addSkill,
    removeSkill,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddSkill);
