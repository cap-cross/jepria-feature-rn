import React from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import connect from 'react-redux/lib/connect/connect';

export default function withBackButton() {
  return (ReactComponent) => {
    const mapStateToProps = state => ({
      index: state.navigate.index,
      nav: state.navigate,
    });

    @connect(mapStateToProps)
    class BackButtonComponent extends React.Component {
      static propTypes = {
        index: PropTypes.number.isRequired,
        navigation: PropTypes.object,
      };

      /* eslint-disable no-useless-constructor */
      constructor(props, context) {
        super(props, context);
      }

      componentDidMount() {
        /*  eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]  */
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }

      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }

      handleBackPress = () => {
        if (this.props.index > 0) {
          console.log(this.props.nav);
          this.props.navigation.goBack(null);
          return true;
        } else {
          return false;
        }
      };

      render() {
        return <ReactComponent {...this.context} {...this.props} />;
      }
    }

    return BackButtonComponent;
  };
}
