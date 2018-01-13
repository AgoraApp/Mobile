import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Login from './../screens/Login';
import Home from './../screens/Home';

const screens = {
  Login: { screen: Login },
  Home: { screen: Home },
};

const options = {
  headerMode: 'none'
};

export const RootNavigator = StackNavigator(screens, options);

const RootRouter = ({ dispatch, rootNavigation }) => (
  <RootNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: rootNavigation
    })} />
);

const mapStateToProps = (state) => ({
  rootNavigation: state.rootNavigation
});

export default connect(mapStateToProps)(RootRouter);
