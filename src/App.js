import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, StatusBar, View } from 'react-native';
import { AppLoading, Font, Asset } from 'expo';

import agoraIcons from './../assets/fonts/agora-icons.ttf';
import splashImage from './../assets/splash.png';
import redPin from './../assets/pin_red.png';
import bluePin from './../assets/pin_blue.png';
import redFavouritePin from './../assets/pin_red_favourited.png';
import blueFavouritePin from './../assets/pin_blue_favourited.png';

import { MAIN_COLOR } from './config/colors';

import { verifyToken, verifyUser, fetchUserData } from './actions/UserActions';

import Root from './screens/root/Root';
import Auth from './screens/auth/Auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
    };
  }

  loadAsync = async () => {
    const cacheResources = this.cacheResourcesAsync();

    return this.props.verifyToken()
      .then(() => (
        this.props.verifyUser()
          .then(() => Promise.all([this.props.fetchUserData(), cacheResources]))
          .catch(() => cacheResources)
      ))
      .catch(() => cacheResources);
  }

  cacheResourcesAsync = async () => {
    const fonts = [
      { AgoraIcons: agoraIcons },
    ];

    const images = [
      splashImage,
      redPin,
      bluePin,
      redFavouritePin,
      blueFavouritePin,
    ];

    const cacheFonts = fonts.map(font => Font.loadAsync(font));
    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());

    return Promise.all([...cacheFonts, ...cacheImages]);
  }

  render() {
    const { isLogged } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <AppLoading
          startAsync={this.loadAsync}
          onFinish={() => this.setState({ isLoaded: true })}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={MAIN_COLOR}
          barStyle="light-content"
        />
        { isLogged ? <Root /> : <Auth /> }
      </View>
    );
  }
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  verifyToken: PropTypes.func.isRequired,
  verifyUser: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    verifyToken,
    verifyUser,
    fetchUserData,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
