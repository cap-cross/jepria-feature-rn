import React from 'react';
import { BackHandler } from 'react-native';

export default withBackButton = () => {
  return (ReactComponent) => {
    class BackButtonComponent extends React.Component {

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
        if (this.props.navigation.state.routeName === "Home") {
          return false;
        } else {
          this.props.navigation.goBack(null);
          return true;
        }
      };

      render() {
        return <ReactComponent {...this.context} {...this.props} />;
      }
    }

    return BackButtonComponent;
  };
}