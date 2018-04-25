import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, Platform, StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper';

import { MAIN_COLOR, COLOR_GREY, FONT_COLOR, FONT_GREY } from './../../config/colors';
import placeShape from './../../config/shapes/placeShape';

import { closeViewSessions } from './../../actions/SessionActions';
import { fetchPlaceSessions } from './../../actions/PlaceActions';

import Icon from './../../components/blocks/Icon';
import Button from './../../components/blocks/Button';
import UserSession from './../../components/blocks/session/UserSession';
import UserSessionSkeleton from './../../components/blocks/session/UserSessionSkeleton';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const DIALOG_HEIGT = Dimensions.get('window').height * 0.55;
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

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressIcon: {
    marginRight: 5,
  },

  address: {
    fontSize: 10,
    color: FONT_GREY,
  },

  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  animationContainer: {
    flex: 1,
  },

  bottomActionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    paddingTop: 15,
    paddingBottom: IS_IPHONE_X ? 35 : 15,
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

class CreateSession extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (this.props.showView !== nextProps.showView) {
      if (nextProps.showView) {
        this.popupDialog.show();
      } else {
        this.popupDialog.dismiss();
      }
    }
  }

  handleClosePress = () => {
    this.popupDialog.dismiss();
  }

  handleShow = () => {
    // Start refreshing of sessions
    this.props.fetchPlaceSessions(this.props.place.id);
  }

  handleDismiss = () => {
    // Stop refreshing of sessions
    this.props.closeViewSessions();
  }

  renderSessions = () => {
    if (this.props.place.sessions) {
      if (this.props.place.sessions.length > 0) {
        return (
          <Swiper loop={false} >
            {
              this.props.place.sessions.map(session => (
                <UserSession key={session.id} session={session} />
              ))
            }
          </Swiper>
        );
      }

      return (
        <Text>There are no active sessions at this place.</Text>
      );
    }

    return (
      <UserSessionSkeleton />
    );
  }

  render() {
    const { place } = this.props;

    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        dialogAnimation={slideAnimation}
        height={DIALOG_HEIGT}
        animationDuration={500}
        containerStyle={styles.container}
        dialogStyle={styles.dialog}
        onShown={this.handleShow}
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
              <Text style={styles.title}>Active sessions</Text>
              <Text>{ place.name }</Text>
              <View style={styles.addressContainer}>
                <Icon style={styles.addressIcon} name="address" size={10} color={FONT_GREY} />
                <Text style={styles.address}>{ place.address }</Text>
              </View>
            </View>
            { this.renderSessions() }
          </View>
        </View>
      </PopupDialog>
    );
  }
}

CreateSession.propTypes = {
  showView: PropTypes.bool.isRequired,
  place: PropTypes.shape(placeShape),
  closeViewSessions: PropTypes.func.isRequired,
  fetchPlaceSessions: PropTypes.func.isRequired,
};

CreateSession.defaultProps = {
  place: {},
};

const mapStateToProps = state => ({
  showView: state.session.showView,
  place: state.place.places.find(place => place.id === state.session.placeId),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    closeViewSessions,
    fetchPlaceSessions,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateSession);
