import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';

import store from './store';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  renderApp = () => {
    if (this.state.isReady) {

    }

    return (
      <AppLoading
        startAsync={() => {}}
        onFinish={() => this.setState({ isReady: true })}
      />
    );
  }

  render() {
    if (this.state.isReady) {

    }

    return (
      <Provider store={store}>
        { this.renderApp() }
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
