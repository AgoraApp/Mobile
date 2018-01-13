import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Auth from './../screens/Auth';
import Login from './../screens/Login';
import Home from './../screens/Home';

const screens = {
  Auth: { screen: Auth },
  Login: { screen: Login },
  Home: { screen: Home },
};

const options = {
  headerMode: 'none',
  transitionConfig: () => ({ screenInterpolator: () => null }),
};

export const RootNavigator = StackNavigator(screens, options);

const RootRouter = ({ dispatch, rootNavigation }) => (
  <RootNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: rootNavigation,
    })}
  />
);

RootRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rootNavigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  rootNavigation: state.rootNavigation,
});

export default connect(mapStateToProps)(RootRouter);
