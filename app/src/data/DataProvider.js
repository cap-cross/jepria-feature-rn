import React from 'react';
import PropTypes from 'prop-types';
// import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

export default class DataProvider extends React.Component {
  static propTypes = {
    //    i18n: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  };

  static defaultProps = {
    appTheme: {},
  };

  render() {
    // return (
    //   <Provider store={this.props.store}>
    //     <I18nextProvider i18n={this.props.i18n}>
    //       {React.Children.only(this.props.children)}
    //     </I18nextProvider>
    //   </Provider>
    // );
    return (
      <Provider store={this.props.store}>
        {React.Children.only(this.props.children)}
      </Provider>
    );
  }
}
