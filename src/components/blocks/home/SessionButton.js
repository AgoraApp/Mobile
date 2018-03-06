import React from 'react';
import { Dimensions } from 'react-native';

import CircularSlider from './CircularSlider';

class SessionButton extends React.PureComponent {
  handlePress = (value) => {
    console.log(value);
  }

  render() {
    return (
      <CircularSlider
        width={Dimensions.get('window').width * (2 / 3)}
        height={Dimensions.get('window').width * (2 / 3)}
        start={30}
        handlePress={this.handlePress}
      />
    );
  }
}

export default SessionButton;
