import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

export default class DataProvider extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  };

  static defaultProps = {
    appTheme: {},
  };

  render() {
    return (
      <Provider store={this.props.store}>
        {React.Children.only(this.props.children)}
      </Provider>
    );
  }
}
