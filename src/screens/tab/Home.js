import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TabViewAnimated, TabViewPagerExperimental, TabBar, SceneMap } from 'react-native-tab-view';

import { MAIN_COLOR, TABBAR_LABEL } from '../../config/colors';
import sessionShape from '../../config/shapes/navigationShape';

import CurrentSession from './../home/CurrentSession';
import Favourites from './../home/Favourites';
import Activity from './../home/Activity';

import Header from './../../components/blocks/home/Header';
import Icon from './../../components/blocks/Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabBar: {
    backgroundColor: '#FFFFFF',
  },

  tabBarLabel: {
    alignItems: 'center',
    marginVertical: 2,
  },

  tabBarText: {
    marginTop: 3,
    fontSize: 10,
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
  constructor(props) {
    super();

    this.state = {
      index: props.currentSession ? 0 : 1,
      routes: [
        { key: 'current_session', title: 'Current session' },
        { key: 'favourites', title: 'Favourite places' },
        { key: 'activity', title: 'Activity' },
      ],
    };
  }

  handleIndexChange = index => this.setState({ index });

  renderPager = props => (
    <TabViewPagerExperimental {...props} swipeEnabled={false} />
  );

  renderLabel = ({ route, focused }) => (
    <View style={styles.tabBarLabel}>
      <Icon name={route.key} size={12} color={focused ? MAIN_COLOR : TABBAR_LABEL} />
      <Text style={[styles.tabBarText, { color: focused ? MAIN_COLOR : TABBAR_LABEL }]}>
        { route.title }
      </Text>
    </View>
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
    current_session: CurrentSession,
    favourites: Favourites,
    activity: Activity,
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

Home.propTypes = {
  currentSession: PropTypes.shape(sessionShape),
};

Home.defaultProps = {
  currentSession: null,
};

const mapStateToProps = state => ({
  currentSession: state.session.currentSession,
});

export default connect(mapStateToProps, null)(Home);
