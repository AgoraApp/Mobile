import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform, Dimensions, StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

import { MAIN_COLOR } from './../../config/colors';
import sessionShape from '../../config/shapes/sessionShape';

import { closeUpdateDuration, setDuration, updateDuration } from './../../actions/SessionActions';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import CircularSlider from '../../components/blocks/session/CircularSlider';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const DIALOG_HEIGT = Dimensions.get('window').height * 0.65;
const SLIDER_SIZE = Dimensions.get('window').width * 0.65;
const IS_IPHONE_X = Platform.OS === 'ios' && Constants.platform.ios.model.toLowerCase() === 'iphone x';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },

  dialog: {
    backgroundColor: 'transparent',
  },

  main: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  actionContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },

  buttonIcon: {
    marginRight: 10,
  },

  content: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttomContainer: {
    alignItems: 'center',
  },

  titleContainer: {
    marginBottom: 20,
  },

  titleStep: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  deleteButton: {
    marginTop: 20,
    marginBottom: IS_IPHONE_X ? 10 : 0,
  },

  buttonText: {
    color: '#FFFFFF',
  },
});

class UpdateDuration extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.showUpdateDuration !== nextProps.showUpdateDuration) {
      if (nextProps.showUpdateDuration) {
        this.popupDialog.show();
      } else {
        this.popupDialog.dismiss();
      }
    }
  }

  handleClosePress = () => {
    this.popupDialog.dismiss();
  }

  handleDismiss = () => {
    this.props.closeUpdateDuration();
  }

  handleDurationChange = (value) => {
    this.props.setDuration(Math.ceil((value * 80) / 300) * 300);
  }

  render() {
    const { currentSession, duration } = this.props;

    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        dialogAnimation={slideAnimation}
        height={DIALOG_HEIGT}
        animationDuration={500}
        containerStyle={styles.container}
        dialogStyle={styles.dialog}
        onDismissed={this.handleDismiss}
      >
        <View style={styles.main}>
          <View style={styles.actionContainer}>
            <Button
              onPress={this.handleClosePress}
            >
              <Icon style={styles.buttonIcon} name="cancel" color={MAIN_COLOR} size={20} />
              <Text>Close</Text>
            </Button>
          </View>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleStep}>Update duration</Text>
              <Text>Select how long you&#39;re planning to stay</Text>
            </View>
            <View style={styles.sliderContainer}>
              <CircularSlider
                width={SLIDER_SIZE}
                height={SLIDER_SIZE}
                value={duration / 80}
                onChange={this.handleDurationChange}
              />
            </View>
            <View style={styles.buttomContainer}>
              <Button
                style={styles.updateButton}
                color={MAIN_COLOR}
                onPress={() => this.props.updateDuration(currentSession.id, duration)}
              >
                <Text style={styles.buttonText}>Update the duration</Text>
              </Button>
            </View>
          </View>
        </View>
      </PopupDialog>
    );
  }
}

UpdateDuration.propTypes = {
  showUpdateDuration: PropTypes.bool.isRequired,
  currentSession: PropTypes.shape(sessionShape),
  duration: PropTypes.number,
  closeUpdateDuration: PropTypes.func.isRequired,
  setDuration: PropTypes.func.isRequired,
  updateDuration: PropTypes.func.isRequired,
};

UpdateDuration.defaultProps = {
  currentSession: {},
  duration: null,
};

const mapStateToProps = state => ({
  showUpdateDuration: state.session.showUpdateDuration,
  currentSession: state.session.currentSession,
  duration: state.session.duration,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeUpdateDuration,
    setDuration,
    updateDuration,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDuration);
