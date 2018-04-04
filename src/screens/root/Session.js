import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';

import { MAIN_COLOR } from './../../config/colors';
import navigationShape from './../../config/shapes/navigationShape';
import placeShape from '../../config/shapes/placeShape';

import { closeSession } from './../../actions/SessionActions';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import SessionButton from '../../components/blocks/session/SessionButton';
import SessionSelectZone from '../../components/blocks/session/SessionSelectZone';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: Constants.statusBarHeight,
  },

  actionsContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  buttonIcon: {
    marginRight: 10,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Session extends React.PureComponent {
  handlePress = () => {
    this.props.navigation.goBack();
    this.props.closeSession();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <Button
            onPress={() => this.handlePress()}
          >
            <Icon style={styles.buttonIcon} name="cancel" color={MAIN_COLOR} size={20} />
            <Text>Close</Text>
          </Button>
        </View>
        <View style={styles.content}>
          <SessionSelectZone />
          <SessionButton />
        </View>
      </View>
    );
  }
}

Session.propTypes = {
  place: PropTypes.shape(placeShape),
  navigation: PropTypes.shape(navigationShape).isRequired,
  closeSession: PropTypes.func.isRequired,
};

Session.defaultProps = {
  place: {},
};

const mapStateToProps = state => ({
  place: state.place.places.find(place => place.id === state.session.placeId),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeSession,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Session);
