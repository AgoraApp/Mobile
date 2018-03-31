import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';

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
  openSession: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    openSession,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(CreateSessionButton);
