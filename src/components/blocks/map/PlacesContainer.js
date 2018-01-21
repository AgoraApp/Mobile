import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import PlaceCard from './PlaceCard';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

class PlaceContainer extends React.PureComponent {
  render() {
    const { focusedPlace } = this.props;

    return (
      <View style={styles.container}>
        {
          focusedPlace ?
            <PlaceCard place={focusedPlace} />
            : null
        }
      </View>
    );
  }
}

PlaceContainer.propTypes = {
  focusedPlace: PropTypes.shape({}),
};

PlaceContainer.defaultProps = {
  focusedPlace: null,
};

const mapStateToProps = state => ({
  focusedPlace: state.place.places.find(place => place.id === state.place.focusedPlace),
});

export default connect(mapStateToProps, null)(PlaceContainer);
