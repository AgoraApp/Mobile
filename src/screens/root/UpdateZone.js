import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, StyleSheet, Animated, Easing, View, Text } from 'react-native';
import { DangerZone } from 'expo';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper';

import { MAIN_COLOR } from './../../config/colors';
import placeShape from '../../config/shapes/placeShape';
import sessionShape from '../../config/shapes/sessionShape';

import { closeUpdateZone, setZone, updateZone } from './../../actions/SessionActions';

import doneAnimation from './../../../assets/animations/done.json';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import ZoneList from '../../components/blocks/session/ZoneList';

const { Lottie } = DangerZone;

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const DIALOG_HEIGT = Dimensions.get('window').height * 0.65;

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
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  stepContainer: {
    flex: 1,
  },

  titleContainer: {
    marginBottom: 20,
  },

  titleStep: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  buttomContainer: {
    alignItems: 'center',
  },

  updateButton: {
    marginTop: 20,
    marginBottom: 10,
  },

  buttonText: {
    color: '#FFFFFF',
  },
});

class UpdateSession extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      index: 0,
      progress: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showUpdateZone !== nextProps.showUpdateZone) {
      if (nextProps.showUpdateZone) {
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
    this.props.closeUpdateZone();

    if (this.state.index !== 0) {
      this.swiper.scrollBy(this.state.index * -1);
      this.setState({
        index: 0,
        progress: new Animated.Value(0),
      });
    }
  }

  handleZoneSelect = (zoneId) => {
    if (zoneId === this.props.selectedZoneId) {
      this.props.setZone(null);
    } else {
      this.props.setZone(zoneId);
    }
  }

  handleValidation = () => {
    this.props.updateZone(
      this.props.currentSession.id,
      this.props.selectedZoneId,
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
    const { place, selectedZoneId } = this.props;

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
                  <Text style={styles.titleStep}>Update zone</Text>
                  <Text>Select where you&#39;re sitting now</Text>
                </View>
                <ZoneList
                  zones={place.zones}
                  selectedZoneId={selectedZoneId}
                  onSelect={this.handleZoneSelect}
                />
                <View style={styles.buttomContainer}>
                  <Button
                    style={styles.updateButton}
                    color={MAIN_COLOR}
                    onPress={this.handleValidation}
                  >
                    <Text style={styles.buttonText}>Update the zone</Text>
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

UpdateSession.propTypes = {
  showUpdateZone: PropTypes.bool.isRequired,
  currentSession: PropTypes.shape(sessionShape),
  place: PropTypes.shape(placeShape),
  selectedZoneId: PropTypes.number,
  closeUpdateZone: PropTypes.func.isRequired,
  setZone: PropTypes.func.isRequired,
  updateZone: PropTypes.func.isRequired,
};

UpdateSession.defaultProps = {
  currentSession: {},
  place: {},
  selectedZoneId: null,
};

const mapStateToProps = state => ({
  showUpdateZone: state.session.showUpdateZone,
  currentSession: state.session.currentSession,
  place: state.session.currentSession ?
    state.place.places.find(place => place.id === state.session.currentSession.place_id)
    : {},
  selectedZoneId: state.session.zoneId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeUpdateZone,
    setZone,
    updateZone,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSession);
