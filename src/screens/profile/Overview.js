import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';

import { MAIN_COLOR } from './../../config/colors';
import skillShape from './../../config/shapes/userShape';

import Tag from './../../components/blocks/Tag';
import SkillsList from './../../components/blocks/profile/SkillsList';
import LogoutButton from '../../components/blocks/profile/LogoutButton';
import EditModeButton from '../../components/blocks/profile/EditModeButton';
import Avatar from '../../components/blocks/profile/Avatar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 150,
    backgroundColor: MAIN_COLOR,
  },

  actionsContainer: {
    position: 'absolute',
    left: 15,
    right: 15,
    top: Constants.statusBarHeight + 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: -60,
  },

  userContainer: {
    flex: 1,
    flexGrow: 1,
    marginTop: 60,
  },

  userInformation: {
    alignItems: 'center',
    padding: 25,
  },

  userName: {
    color: MAIN_COLOR,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

class Profile extends React.PureComponent {
  render() {
    const {
      firstName,
      lastName,
      expertise,
      skills,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.actionsContainer}>
            <LogoutButton />
            <EditModeButton />
          </View>
          <View style={styles.avatarContainer}>
            <Avatar />
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userInformation}>
            <Text style={styles.userName}>{ firstName } { lastName }</Text>
            <Tag text={expertise.toUpperCase()} size="small" />
          </View>
          <SkillsList skills={skills} />
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  expertise: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape(skillShape)).isRequired,
};

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  expertise: state.user.expertise,
  skills: state.user.skills,
});

export default connect(mapStateToProps, null)(Profile);
