import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import moment from 'moment';

import { setDuration } from './../../../actions/SessionActions';

import CircularSlider from './CircularSlider';

class SessionButton extends React.PureComponent {
  constructor(props) {
    super();

    this.state = {
      value: props.duration,
    };

    this.refreshInterval = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.start !== nextProps.start) {
      this.setRemainingSeconds(nextProps.start, nextProps.duration);

      this.refreshInterval = setInterval(this.setRemainingSeconds, 500);
    }

    if (this.props.duration !== nextProps.duration) {
      this.setState({ value: nextProps.duration });
    }
  }

  setRemainingSeconds = (start = this.props.start, duration = this.props.duration) => {
    const clonedStart = start.clone();
    const end = clonedStart.add(duration, 'seconds');
    const current = moment();
    const difference = Math.ceil((end.diff(current, 'seconds')) / 300) * 300;

    this.setState({ value: difference });
  }

  handleChange = (value) => {
    if (!this.props.start) {
      this.props.setDuration(Math.ceil((value * 80) / 300) * 300);
    }
  }

  render() {
    const { value } = this.state;

    return (
      <CircularSlider
        width={Dimensions.get('window').width * (2 / 3)}
        height={Dimensions.get('window').width * (2 / 3)}
        value={value / 80}
        onChange={this.handleChange}
      />
    );
  }
}

SessionButton.propTypes = {
  duration: PropTypes.number.isRequired,
  start: PropTypes.shape({}),
  setDuration: PropTypes.func.isRequired,
};

SessionButton.defaultProps = {
  start: null,
};

const mapStateToProps = state => ({
  duration: state.session.duration,
  start: state.session.start,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setDuration,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SessionButton);
