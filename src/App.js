import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppLoading, Font, Asset } from 'expo';

import agoraIcons from './../assets/fonts/agora-icons.ttf';
import splashImage from './../assets/splash.png';

import { verifyUser } from './actions/UserActions';

import RootRouter from './navigation/RootNavigation';
import AuthRouter from './navigation/AuthNavigation';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      resourcesLoaded: false,
    };
  }

  componentDidMount() {
    this.props.verifyUser();
  }

  cacheResourcesAsync = async () => {
    const fonts = [
      { AgoraIcons: agoraIcons },
    ];

    const images = [
      splashImage,
    ];

    const cacheFonts = fonts.map(font => Font.loadAsync(font));
    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());

    return Promise.all([...cacheFonts, ...cacheImages]);
  }

  render() {
    const { isLoaded, isLogged } = this.props;
    const { resourcesLoaded } = this.state;

    if (isLoaded && resourcesLoaded) {
      return isLogged ? <RootRouter /> : <AuthRouter />;
    }

    return (
      <AppLoading
        startAsync={this.cacheResourcesAsync}
        onFinish={() => this.setState({ resourcesLoaded: true })}
      />
    );
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
  verifyUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoaded: state.app.isLoaded,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    verifyUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
