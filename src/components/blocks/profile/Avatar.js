import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { ImagePicker } from 'expo';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftContainer: {
    width: 60,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },

  rightContainer: {
    width: 60,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.2)',
  },

  editText: {
    color: '#FFFFFF',
    marginTop: 4,
    fontSize: 12,
  },
});

class Avatar extends React.PureComponent {
  handleChooseImage = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    console.log(response);
  }

  handleTakeImage = async () => {
    const response = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    console.log(response);
  }

  renderEdit = () => {
    console.log(ImagePicker);
    if (this.props.isEditMode) {
      return (
        <View style={styles.editContainer}>
          <TouchableWithoutFeedback onPress={() => this.handleChooseImage()}>
            <View style={styles.leftContainer}>
              <Icon name="picture" size={15} color="white" />
              <Text style={styles.editText}>Choose</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.handleTakeImage()}>
            <View style={styles.rightContainer}>
              <Icon name="camera" size={15} color="white" />
              <Text style={styles.editText}>Take</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    return null;
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.avatar }}
            blurRadius={this.props.isEditMode ? 4 : 0}
          />
          { this.renderEdit() }
        </View>
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
