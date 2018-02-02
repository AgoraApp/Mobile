import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';

import Icon from '../Icon';

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
  },

  editContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 60,
  },
});

class Avatar extends React.PureComponent {
  handlePress = () => {
    console.log('PRESS');
  }

  renderEdit = () => {
    if (this.props.isEditMode) {
      return (
        <TouchableWithoutFeedback onPress={() => this.handlePress()}>
          <View style={styles.editContainer}>
            <Icon name="camera" size={30} color="white" />
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return null;
  }

  render() {
    return (
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: this.props.avatar }}
          blurRadius={this.props.isEditMode ? 4 : 0}
        />
        { this.renderEdit() }
      </View>
    );
  }
}

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  avatar: state.user.avatar,
  isEditMode: state.profile.isEditMode,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
