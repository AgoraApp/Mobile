import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper';

import { MAIN_COLOR, COLOR_GREY, FONT_COLOR } from './../../config/colors';
import placeShape from '../../config/shapes/placeShape';

import { closeSession, setZone, setDuration, createSession } from './../../actions/SessionActions';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import ZoneList from '../../components/blocks/session/ZoneList';
import CircularSlider from '../../components/blocks/session/CircularSlider';
import Validation from '../../components/blocks/session/Validation';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const NUMBER_OF_STEPS = 3;
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

  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomActionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    paddingTop: 10,
    paddingBottom: IS_IPHONE_X ? 35 : 20,
    borderTopWidth: 1,
    borderColor: COLOR_GREY,
    backgroundColor: '#FFFFFF',
  },

  nextButton: {
    marginLeft: 'auto',
  },

  actionButtonText: {
    color: FONT_COLOR,
  },
});

class Session extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedPlaceId && nextProps.selectedPlaceId) {
      this.popupDialog.show();
    }

    if (this.props.selectedPlaceId && !nextProps.selectedPlaceId) {
      this.popupDialog.dismiss();
    }
  }

  getPreviousDisabled = () => {
    const { index } = this.state;

    if (index === 0) {
      return true;
    }

    return false;
  }

  getNextDisabled = () => {
    const { selectedZoneId } = this.props;
    const { index } = this.state;

    if ((index === 0 && !selectedZoneId) ||
        index + 1 === NUMBER_OF_STEPS) {
      return true;
    }

    return false;
  }

  handleClosePress = () => {
    this.popupDialog.dismiss();
  }

  handleDismiss = () => {
    this.props.closeSession();

    if (this.state.index !== 0) {
      this.swiper.scrollBy(this.state.index * -1);
      this.setState({ index: 0 });
    }
  }

  handleZonePress = () => {
    this.popupDialog.show();
  }

  handleZoneSelect = (zoneId) => {
    if (zoneId === this.props.selectedZoneId) {
      this.props.setZone(null);
    } else {
      this.props.setZone(zoneId);
      this.handleNext();
    }
  }

  handleDurationChange = (value) => {
    this.props.setDuration(Math.ceil((value * 80) / 300) * 300);
  }

  handleValidation = () => {
    this.props.createSession(
      this.props.selectedPlaceId,
      this.props.selectedZoneId,
      this.props.duration,
    );
  }

  handlePrevious = () => {
    const { index } = this.state;

    this.setState({ index: index - 1 });
    this.swiper.scrollBy(-1);
  }

  handleNext = () => {
    const { index } = this.state;

    this.setState({ index: index + 1 });
    this.swiper.scrollBy(1);
  }

  render() {
    const { place, selectedZoneId, duration } = this.props;

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
                  <Text style={styles.titleStep}>Step 1</Text>
                  <Text>Select where you&#39;re sitting</Text>
                </View>
                <ZoneList
                  zones={place.zones}
                  selectedZoneId={selectedZoneId}
                  onSelect={this.handleZoneSelect}
                />
              </View>
              <View style={styles.stepContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleStep}>Step 2</Text>
                  <Text>Select how long you&#39;ll be there</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <CircularSlider
                    width={SLIDER_SIZE}
                    height={SLIDER_SIZE}
                    value={duration / 80}
                    onChange={this.handleDurationChange}
                  />
                </View>
              </View>
              <View style={styles.stepContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleStep}>Validation</Text>
                  <Text>Verify your session settings and start the session</Text>
                </View>
                {
                  place.zones ?
                    <Validation
                      place={place}
                      zone={place.zones.find(zone => zone.id === selectedZoneId)}
                      duration={duration}
                      onValidate={this.handleValidation}
                    />
                    : null
                }
              </View>
            </Swiper>
          </View>
          <View style={styles.bottomActionContainer}>
            <TouchableOpacity
              style={styles.previousButton}
              onPress={this.handlePrevious}
              disabled={this.getPreviousDisabled()}
            >
              <Text
                style={[styles.actionButtonText, { opacity: this.getPreviousDisabled() ? 0.5 : 1 }]}
              >
                Previous step
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={this.handleNext}
              disabled={this.getNextDisabled()}
            >
              <Text
                style={[styles.actionButtonText, { opacity: this.getNextDisabled() ? 0.5 : 1 }]}
              >
                Next step
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupDialog>
    );
  }
}

Session.propTypes = {
  place: PropTypes.shape(placeShape),
  selectedPlaceId: PropTypes.number,
  selectedZoneId: PropTypes.number,
  duration: PropTypes.number.isRequired,
  closeSession: PropTypes.func.isRequired,
  setZone: PropTypes.func.isRequired,
  setDuration: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired,
};

Session.defaultProps = {
  place: {},
  selectedPlaceId: null,
  selectedZoneId: null,
};

const mapStateToProps = state => ({
  place: state.place.places.find(place => place.id === state.session.placeId),
  selectedPlaceId: state.session.placeId,
  selectedZoneId: state.session.zoneId,
  duration: state.session.duration,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeSession,
    setZone,
    setDuration,
    createSession,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Session);
