import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';
import sessionShape from './../../../config/shapes/sessionShape';

import { openSession } from './../../../actions/SessionActions';

import Button from './../Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },

  text: {
    color: '#FFFFFF',
  },
});

class CreateSessionButton extends React.PureComponent {
  render() {
    if (this.props.currentSession) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Button
          color={MAIN_COLOR}
          onPress={() => this.props.openSession(this.props.place.id)}
        >
          <Text style={styles.text}>Create a session</Text>
        </Button>
      </View>
    );
  }
}

CreateSessionButton.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  currentSession: PropTypes.shape(sessionShape),
  openSession: PropTypes.func.isRequired,
};

CreateSessionButton.defaultProps = {
  currentSession: null,
};

const mapStateToProps = state => ({
  currentSession: state.session.currentSession,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    openSession,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateSessionButton);
