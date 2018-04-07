import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';
import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog';

import { MAIN_COLOR } from './../../config/colors';
import navigationShape from './../../config/shapes/navigationShape';
import placeShape from '../../config/shapes/placeShape';

import { closeSession, setZone, setDuration } from './../../actions/SessionActions';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import SelectZone from '../../components/blocks/session/SelectZone';
import CircularSlider from '../../components/blocks/session/CircularSlider';
import ZoneList from '../../components/blocks/session/ZoneList';

const scaleAnimation = new ScaleAnimation();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  main: {
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
    marginVertical: 35,
  },

  zoneContainer: {
    marginBottom: 35,
  },
});

class Session extends React.PureComponent {
  constructor() {
    super();

    this.popupDialog = null;
  }

  handleClosePress = () => {
    this.props.navigation.goBack();

    setTimeout(() => {
      this.props.closeSession();
    }, 1000);
  }

  handleZonePress = () => {
    this.popupDialog.show();
  }

  handleZoneSelect = (zoneId) => {
    this.props.setZone(zoneId);
    this.popupDialog.dismiss();
  }

  handleDurationChange = (value) => {
    this.props.setDuration(Math.ceil((value * 80) / 300) * 300);
  }

  render() {
    const {
      place,
      selectedZoneId,
      duration,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.actionsContainer}>
            <Button
              onPress={() => this.handleClosePress()}
            >
              <Icon style={styles.buttonIcon} name="cancel" color={MAIN_COLOR} size={20} />
              <Text>Close</Text>
            </Button>
          </View>
          <View style={styles.content}>
            <SelectZone
              style={styles.zoneContainer}
              zones={place.zones}
              selectedZoneId={selectedZoneId}
              onPress={this.handleZonePress}
            />
            <CircularSlider
              width={Dimensions.get('window').width * (2 / 3)}
              height={Dimensions.get('window').width * (2 / 3)}
              value={duration / 80}
              onChange={this.handleDurationChange}
            />
          </View>
        </View>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          width={Dimensions.get('window').width - 50}
          dialogAnimation={scaleAnimation}
        >
          <ZoneList
            zones={place.zones}
            selectedZoneId={selectedZoneId}
            onSelect={this.handleZoneSelect}
          />
        </PopupDialog>
      </View>
    );
  }
}

Session.propTypes = {
  place: PropTypes.shape(placeShape),
  selectedZoneId: PropTypes.number,
  duration: PropTypes.number.isRequired,
  navigation: PropTypes.shape(navigationShape).isRequired,
  closeSession: PropTypes.func.isRequired,
  setZone: PropTypes.func.isRequired,
  setDuration: PropTypes.func.isRequired,
};

Session.defaultProps = {
  place: {},
  selectedZoneId: null,
};

const mapStateToProps = state => ({
  place: state.place.places.find(place => place.id === state.session.placeId),
  selectedZoneId: state.session.zoneId,
  duration: state.session.duration,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeSession,
    setZone,
    setDuration,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Session);
