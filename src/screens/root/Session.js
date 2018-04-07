import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';
import Carousel from 'react-native-snap-carousel';

// import { MAIN_COLOR } from './../../config/colors';
import navigationShape from './../../config/shapes/navigationShape';
import placeShape from '../../config/shapes/placeShape';

import { closeSession, setZone, setDuration } from './../../actions/SessionActions';

// import Icon from './../../components/blocks/Icon';
// import Button from './../../components/blocks/Button';
import SelectZone from '../../components/blocks/session/SelectZone';
import CircularSlider from '../../components/blocks/session/CircularSlider';
// import ZoneList from '../../components/blocks/session/ZoneList';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },

  item: {
    flex: 1,
    padding: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
  },

  zoneContainer: {
    marginBottom: 35,
  },
});

class Session extends React.PureComponent {
  handleZonePress = () => {
    this.popupDialog.show();
  }

  // handleZoneSelect = (zoneId) => {
  //   this.props.setZone(zoneId);
  //   this.popupDialog.dismiss();
  // }

  handleDurationChange = (value) => {
    this.props.setDuration(Math.ceil((value * 80) / 300) * 300);
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{ item.title }</Text>
        { item.render() }
      </View>
    );
  }

  render() {
    const {
      place,
      selectedZoneId,
      duration,
    } = this.props;

    const entries = [
      <SelectZone
        style={styles.zoneContainer}
        zones={place.zones}
        selectedZoneId={selectedZoneId}
        onPress={this.handleZonePress}
      />,
      <CircularSlider
        width={Dimensions.get('window').width * (2 / 3)}
        height={Dimensions.get('window').width * (2 / 3)}
        value={duration / 80}
        onChange={this.handleDurationChange}
      />,
    ];

    const entry = [
      {
        title: 'Beautiful and dramatic Antelope Canyon',
        render: () => (
          <SelectZone
            style={styles.zoneContainer}
            zones={place.zones}
            selectedZoneId={selectedZoneId}
            onPress={this.handleZonePress}
          />
        ),
      },
      {
        title: 'Beautiful and dramatic Antelope Canyon',
        render: () => (
          <CircularSlider
            width={Dimensions.get('window').width * (2 / 3)}
            height={Dimensions.get('window').width * (2 / 3)}
            value={duration / 80}
            onChange={this.handleDurationChange}
          />
        ),
      },
    ];

    const viewPortWidth = Dimensions.get('window').width;
    const viewPortheight = Dimensions.get('window').height;

    return (
      <View style={styles.container}>
        <View style={{ height: viewPortheight * 0.5 }}>
          <Carousel
            layout="default"
            data={entry}
            renderItem={this.renderItem}
            sliderWidth={viewPortWidth}
            itemWidth={viewPortWidth * 0.75}
          />
        </View>
      </View>
    );
  }
}

Session.propTypes = {
  place: PropTypes.shape(placeShape),
  selectedZoneId: PropTypes.number,
  duration: PropTypes.number.isRequired,
  // navigation: PropTypes.shape(navigationShape).isRequired,
  // closeSession: PropTypes.func.isRequired,
  // setZone: PropTypes.func.isRequired,
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
