import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, StyleSheet, Animated, Easing, View, Text } from 'react-native';
import { DangerZone } from 'expo';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper';

import { MAIN_COLOR } from './../../config/colors';
import sessionShape from '../../config/shapes/sessionShape';

import { closeUpdateDuration, setDuration, updateDuration } from './../../actions/SessionActions';

import doneAnimation from './../../../assets/animations/done.json';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import CircularSlider from '../../components/blocks/session/CircularSlider';

const { Lottie } = DangerZone;

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const DIALOG_HEIGT = Dimensions.get('window').height * 0.65;
const SLIDER_SIZE = Dimensions.get('window').width * 0.65;

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

  stepContainer: {
    flex: 1,
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

  updateButton: {
    marginTop: 20,
    marginBottom: 10,
  },

  buttonText: {
    color: '#FFFFFF',
  },
});

class UpdateDuration extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      index: 0,
      progress: new Animated.Value(0),
    };
  }

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

    if (this.state.index !== 0) {
      this.swiper.scrollBy(this.state.index * -1);
      this.setState({
        index: 0,
        progress: new Animated.Value(0),
      });
    }
  }

  handleDurationChange = (value) => {
    this.props.setDuration(Math.ceil((value * 80) / 300) * 300);
  }

  handleValidation = () => {
    this.props.updateDuration(
      this.props.currentSession.id,
      this.props.duration,
    ).then(() => {
      this.handleNext();
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start(() => {
        this.popupDialog.dismiss();
      });
    });
  }

  handleNext = () => {
    const { index } = this.state;

    this.setState({ index: index + 1 });
    this.swiper.scrollBy(1);
  }

  render() {
    const { duration } = this.props;

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
            <Swiper
              ref={(swiper) => { this.swiper = swiper; }}
              loop={false}
              showsPagination={false}
              scrollEnabled={false}
            >
              <View style={styles.stepContainer}>
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
                    onPress={this.handleValidation}
                  >
                    <Text style={styles.buttonText}>Update the duration</Text>
                  </Button>
                </View>
              </View>
              <View style={styles.stepContainer}>
                <Lottie
                  style={styles.animationContainer}
                  source={doneAnimation}
                  progress={this.state.progress}
                />
              </View>
            </Swiper>
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
