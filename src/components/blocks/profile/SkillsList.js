import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { MAIN_COLOR, COLOR_GREY, FONT_COLOR } from './../../../config/colors';

import skillShape from './../../../config/shapes/userShape';
import navigationShape from './../../../config/shapes/navigationShape';

import Tag from './../Tag';
import Icon from './../Icon';
import Button from './../Button';

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
          {
            this.props.skills.length > 0 ?
              <FlatList
                data={this.createSkillGroups()}
                keyExtractor={item => item[0].id}
                renderItem={this.renderSkill}
                horizontal
              />
              :
              <Text>Start adding some skills to help us to know you.</Text>
          }
        </View>
        <View style={styles.actionContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('AddSkill')}
          >
            <Icon name="plus" color={MAIN_COLOR} size={20} />
          </Button>
        </View>
      </View>
    );
  }
}

SkillsList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.shape(skillShape)),
  navigation: PropTypes.shape(navigationShape).isRequired,
};

SkillsList.defaultProps = {
  skills: [],
};

export default withNavigation(SkillsList);
