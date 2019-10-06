import React from 'react';
import PropTypes from 'prop-types';
import {Navigator} from '../../config/navigation';

export default class ScreenManager extends React.Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      navigate: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator/>
    );
  }
}
