import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import placeShape from './../../../config/shapes/placeShape';
import sessionShape from './../../../config/shapes/sessionShape';

import PlaceFavouriteButton from './../place/PlaceFavouriteButton';
import CreateSessionButton from './../session/CreateSessionButton';
import ViewSessionsButton from './../session/ViewSessionsButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },

  content: {
    flexGrow: 1,
  },

  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class PlaceCardContent extends React.PureComponent {
  render() {
    const { place, currentSession } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <PlaceFavouriteButton place={place} />
        <View style={styles.content}>
          <Text>{ place.description }</Text>
        </View>
        <View style={[styles.actionsContainer, { justifyContent: currentSession ? 'center' : 'space-between' }]}>
          <ViewSessionsButton place={place} />
          {
            currentSession ?
              null
              : <CreateSessionButton place={place} />
          }
        </View>
      </ScrollView>
    );
  }
}

PlaceCardContent.propTypes = {
  place: PropTypes.shape(placeShape).isRequired,
  currentSession: PropTypes.shape(sessionShape),
};

PlaceCardContent.defaultProps = {
  currentSession: null,
};

export default PlaceCardContent;
