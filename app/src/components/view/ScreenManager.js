import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';

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
      <Navigator
        // navigation={{
        //   dispatch: this.props.dispatch,
        //   state: this.props.navigate,
        //   addListener: this._addListener
        // }}
      />
    );
  }
}
