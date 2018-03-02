import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import Icon from './../components/blocks/Icon';

import { MAIN_COLOR, TABBAR_INACTIVE } from './../config/colors';

import Home from './../screens/tab/Home';
import Places from './../screens/tab/Places';
import Profile from './../screens/tab/Profile';

const screens = {
  Home: { screen: Home },
  Places: { screen: Places },
  Profile: { screen: Profile },
};

const options = {
  initialRouteName: 'Home',
  swipeEnabled: false,
  animationEnabled: true,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => { // eslint-disable-line react/prop-types
      const { routeName } = navigation.state;
      let iconName;

      if (routeName === 'Home') {
        iconName = 'home';
      } else if (routeName === 'Places') {
        iconName = 'location';
      } else if (routeName === 'Profile') {
        iconName = 'user';
      }

      return <Icon name={iconName} size={24} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    inactiveTintColor: TABBAR_INACTIVE,
    activeTintColor: MAIN_COLOR,
    inactiveBackgroundColor: '#FFFFFF',
    activeBackgroundColor: '#FFFFFF',
    labelStyle: {
      fontSize: 10,
    },
    style: {
      backgroundColor: '#FFFFFF',
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
