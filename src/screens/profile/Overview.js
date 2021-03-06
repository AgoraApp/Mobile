import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Constants } from 'expo';

import { MAIN_COLOR } from './../../config/colors';

import SkillsList from './../../components/blocks/profile/SkillsList';
import LogoutButton from '../../components/blocks/profile/LogoutButton';
import EditModeButton from '../../components/blocks/profile/EditModeButton';
import Avatar from '../../components/blocks/profile/Avatar';
import Name from '../../components/blocks/profile/Name';
import Expertise from '../../components/blocks/profile/Expertise';
import SaveButton from '../../components/blocks/profile/SaveButton';

const AVATAR_HEIGT = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: Constants.statusBarHeight + 10 + (AVATAR_HEIGT / 2) + 30,
    backgroundColor: MAIN_COLOR,
    zIndex: 10,
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 15,
  },

  avatarContainer: {
    alignItems: 'center',
  },

  userContainer: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 20,
  },

  userInformation: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },
});

class Profile extends React.PureComponent {
  render() {
    const { isEditMode } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.actionsContainer}>
            <LogoutButton />
            {
              !isEditMode ?
                <EditModeButton />
                : null
            }
          </View>
          <View style={styles.avatarContainer}>
            <Avatar />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.container}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.userContainer}>
            <View style={styles.userInformation}>
              <Name />
              <Expertise />
            </View>
            {
              isEditMode ?
                <SaveButton />
                : <SkillsList />
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

Profile.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isEditMode: state.profile.isEditMode,
});

export default connect(mapStateToProps, null)(Profile);
