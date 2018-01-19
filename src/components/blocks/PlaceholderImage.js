import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';

import { COLOR_GREY } from './../../config/colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOR_GREY,
  },
});

class PlaceholderImage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { src, style } = this.props;
    const { loading } = this.state;

    return (
      <View>
        <Image
          style={style}
          source={{ uri: src }}
          onLoadStart={() => this.setState({ loading: true })}
          onLoad={() => this.setState({ loading: false })}
        />
        {
          loading ?
            <View style={[style, styles.container]} />
            : null
        }
      </View>
    );
  }
}

PlaceholderImage.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
};

PlaceholderImage.defaultProps = {
  style: {},
};

export default PlaceholderImage;
