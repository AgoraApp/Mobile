import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Constants } from 'expo';

import { MAIN_COLOR } from './../config/colors';
import skillShape from './../config/shapes/userShape';

import { logout } from './../actions/UserActions';

import Icon from './../components/blocks/Icon';
import Tag from './../components/blocks/Tag';
import SkillsList from './../components/blocks/profile/SkillsList';

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
    right: 15,
    top: Constants.statusBarHeight,
  },

  avatarContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: -60,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
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

class Profile extends React.Component {
  handleLogout() {
    this.props.logout();
  }

  render() {
    const {
      firstName,
      lastName,
      expertise,
      avatar,
      skills,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => this.handleLogout()}
            >
              <Icon name="logout" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
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
  avatar: PropTypes.string.isRequired,
  expertise: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape(skillShape)).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  avatar: state.user.avatar,
  expertise: state.user.expertise,
  skills: state.user.skills,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logout,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
