import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { MAIN_COLOR, COLOR_GREY, FONT_COLOR } from './../../../config/colors';

import { skillShape } from './../../../config/shapes/userShape';
import navigationShape from './../../../config/shapes/navigationShape';

import Tag from './../Tag';
import Icon from './../Icon';
import Button from './../Button';

const ITEMS_PER_GROUP = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  skillsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  emptySkills: {
    color: 'rgba(0, 0, 0, 0.35)',
    marginTop: 20,
    marginBottom: 10,
  },

  tagList: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  tag: {
    marginBottom: 10,
  },

  removeTag: {
    marginLeft: 'auto',
    paddingLeft: 20,
  },

  actionContainer: {
    alignItems: 'center',
  },

  buttonIcon: {
    marginRight: 10,
  },
});

class SkillsList extends React.PureComponent {
  createSkillGroups = () => {
    const finalSkills = [];
    let tempSkills = [];

    this.props.skills.forEach((skill, index) => {
      tempSkills.push(skill);

      if (tempSkills.length === ITEMS_PER_GROUP) {
        finalSkills.push(tempSkills);
        tempSkills = [];
      } else if (index === this.props.skills.length - 1) {
        finalSkills.push(tempSkills);
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
    const { skills, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.skillsContainer}>
          {
            skills.length > 0 ?
              <FlatList
                data={this.createSkillGroups()}
                keyExtractor={item => item[0].id}
                renderItem={this.renderSkill}
                scrollEnabled={skills.length > ITEMS_PER_GROUP}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              :
              <Text style={styles.emptySkills}>
                Start adding some skills to help us to know you.
              </Text>
          }
        </View>
        <View style={styles.actionContainer}>
          <Button
            onPress={() => navigation.navigate('AddSkill')}
          >
            <Icon style={styles.buttonIcon} name="plus" color={MAIN_COLOR} size={20} />
            <Text>Add a skill</Text>
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

const mapStateToProps = state => ({
  skills: state.user.skills,
});

export default withNavigation(connect(mapStateToProps, null)(SkillsList));
