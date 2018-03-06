import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TabViewAnimated, TabViewPagerExperimental, TabBar, SceneMap } from 'react-native-tab-view';

import { MAIN_COLOR, TABBAR_LABEL } from '../../config/colors';

import Session from './../home/Session';
import Notifications from './../home/Notifications';

import Header from '../../components/blocks/home/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabBar: {
    backgroundColor: '#FFFFFF',
  },

  tabBarLabel: {
    marginVertical: 5,
  },

  tabBarIndicator: {
    backgroundColor: MAIN_COLOR,
  },
});

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

/* eslint-disable react/no-unused-state */
class Home extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        { key: 'session', title: 'Session' },
        { key: 'notifications', title: 'Notifications' },
      ],
    };
  }

  handleIndexChange = index => this.setState({ index });

  renderPager = props => (
    <TabViewPagerExperimental {...props} swipeEnabled={false} />
  );

  renderLabel = ({ route, focused }) => (
    <Text style={[styles.tabBarLabel, { color: focused ? MAIN_COLOR : TABBAR_LABEL }]}>
      { route.title }
    </Text>
  );

  renderHeader = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      labelStyle={styles.tabBarLabel}
      indicatorStyle={styles.tabBarIndicator}
      renderLabel={this.renderLabel}
    />
  );


  renderScene = SceneMap({
    session: Session,
    notifications: Notifications,
  });

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          renderPager={this.renderPager}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
          useNativeDriver
        />
      </View>
    );
  }
}

export default Home;
