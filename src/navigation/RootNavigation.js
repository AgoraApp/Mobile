import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import Home from './../screens/Home';

const screens = {
  Home: { screen: Home },
};

const options = {
  initialRouteName: 'Home',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#1a1a1a',
    labelStyle: {
      fontSize: 16,
    },
  },
};

export const RootNavigator = TabNavigator(screens, options);

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
