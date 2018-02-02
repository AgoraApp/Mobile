import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Overview from './../screens/profile/Overview';
import AddSkill from './../screens/profile/AddSkill';
import Edit from './../screens/profile/Edit';

const screens = {
  Overview: { screen: Overview },
  AddSkill: { screen: AddSkill },
  Edit: { screen: Edit },
};

const options = {
  initialRouteName: 'Overview',
  headerMode: 'none',
  mode: 'modal',
};

export const ProfileNavigator = StackNavigator(screens, options);

const ProfileRouter = ({ dispatch, profileNavigation }) => (
  <ProfileNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: profileNavigation,
    })}
  />
);

ProfileRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profileNavigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  profileNavigation: state.profileNavigation,
});

export default connect(mapStateToProps)(ProfileRouter);
