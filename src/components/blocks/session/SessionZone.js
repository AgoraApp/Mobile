import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { COLOR_GREY, FONT_COLOR } from './../../../config/colors';

import Tag from './../Tag';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

class SessionZone extends React.PureComponent {
  handlePress = () => {
    console.log('test');
  }

  render() {
    const { zone } = this.props;

    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.container}>
        <Tag
          // style={}
          text={zone.name}
          color={COLOR_GREY}
          fontColor={FONT_COLOR}
          size="large"
        />
      </TouchableOpacity>
    );
  }
}

SessionZone.propTypes = {
  zone: PropTypes.shape({}).isRequired,
};

export default SessionZone;
