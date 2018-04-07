import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { SECONDARY_COLOR, COLOR_GREY, FONT_COLOR } from './../../../config/colors';

import Tag from './../Tag';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

class Zone extends React.PureComponent {
  render() {
    const { zone, selected, onSelect } = this.props;

    return (
      <TouchableOpacity onPress={onSelect} style={styles.container}>
        <Tag
          text={zone.name}
          color={selected ? SECONDARY_COLOR : COLOR_GREY}
          fontColor={selected ? '#FFFFFF' : FONT_COLOR}
          size="large"
        />
      </TouchableOpacity>
    );
  }
}

Zone.propTypes = {
  zone: PropTypes.shape({}).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Zone;
