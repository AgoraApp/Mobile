import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import { MAIN_COLOR, COLOR_GREY, FONT_COLOR } from './../../../config/colors';

import skillShape from './../../../config/shapes/userShape';

import Tag from './../Tag';
import Icon from './../Icon';

const styles = StyleSheet.create({
  skillsContainer: {
    marginBottom: 20,
  },

  tagList: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  tag: {
    marginBottom: 10,
  },

  actionContainer: {
    alignItems: 'center',
  },

  button: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 50,
  },
});

class SkillsList extends React.PureComponent {
  createSkillGroups = () => {
    const ITEMS_PER_GROUP = 4;
    const finalSkills = [];
    let tempSkills = [];

    this.props.skills.forEach((skill) => {
      tempSkills.push(skill);

      if (tempSkills.length === ITEMS_PER_GROUP) {
        finalSkills.push(tempSkills);
        tempSkills = [];
      }
    });

    return finalSkills;
  }

  handleAddSkill = () => {
    console.log('handleAddSkill');
  }

  renderSkill = ({ item }) => (
    <View style={styles.tagList}>
      {
        item.map(skill => (
          <Tag
            style={styles.tag}
            key={skill.id}
            text={skill.name}
            color={COLOR_GREY}
            fontColor={FONT_COLOR}
            size="large"
          />
        ))
      }
    </View>
  );

  render() {
    return (
      <View>
        <View style={styles.skillsContainer}>
          <FlatList
            data={this.createSkillGroups()}
            keyExtractor={item => item[0].id}
            renderItem={this.renderSkill}
            horizontal
          />
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleAddSkill()}
          >
            <Icon name="plus" color={MAIN_COLOR} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SkillsList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape(skillShape)),
};

SkillsList.defaultProps = {
  skills: [],
};

export default SkillsList;
