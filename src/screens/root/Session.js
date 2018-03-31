import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';

import { MAIN_COLOR } from './../../config/colors';
import navigationShape from './../../config/shapes/navigationShape';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';

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
});

class Session extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <Button
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon style={styles.buttonIcon} name="cancel" color={MAIN_COLOR} size={20} />
            <Text>Close</Text>
          </Button>
        </View>
      </View>
    );
  }
}

Session.propTypes = {
  navigation: PropTypes.shape(navigationShape).isRequired,
};

// const mapStateToProps = state => ({
// });

// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//   }, dispatch)
// );

// export default connect(mapStateToProps, mapDispatchToProps)(Session);
export default Session;
