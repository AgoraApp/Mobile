import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Tab from './../screens/root/Tab';
import Session from './../screens/root/Session';

const screens = {
  Tab: { screen: Tab },
  Session: { screen: Session },
};

const options = {
  initialRouteName: 'Tab',
  headerMode: 'none',
  mode: 'modal',
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
