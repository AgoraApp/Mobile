import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Auth from './../screens/Auth';
import Login from './../screens/Login';

const screens = {
  Auth: { screen: Auth },
  Login: { screen: Login },
};

const options = {
  initialRouteName: 'Login',
  headerMode: 'none',
  transitionConfig: () => ({ screenInterpolator: () => null }),
};

export const AuthNavigator = StackNavigator(screens, options);

const AuthRouter = ({ dispatch, authNavigation }) => (
  <AuthNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: authNavigation,
    })}
  />
);

AuthRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authNavigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  authNavigation: state.authNavigation,
});

export default connect(mapStateToProps)(AuthRouter);
