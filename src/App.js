import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppLoading } from 'expo';

import { verifyUser } from './actions/UserActions';

import RootRouter from './navigation/RootNavigation';

class App extends React.Component {
  componentDidMount() {
    this.props.verifyUser();
  }

  render() {
    const { isLoaded } = this.props;

    if (isLoaded) {
      return <RootRouter />;
    }

    return (
      <AppLoading />
    );
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  verifyUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoaded: state.app.isLoaded,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    verifyUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
