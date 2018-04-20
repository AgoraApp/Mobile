import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';

import { MAIN_COLOR } from './../../../config/colors';
import placeShape from './../../../config/shapes/placeShape';

import { openViewSessions } from './../../../actions/SessionActions';

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

class ViewSessionsButton extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Button
          color={MAIN_COLOR}
          onPress={() => this.props.openViewSessions(this.props.place.id)}
        >
          <Text style={styles.text}>View active sessions</Text>
        </Button>
      </View>
    );
  }
}

ViewSessionsButton.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  openViewSessions: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    openViewSessions,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(ViewSessionsButton);
