import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Toast } from 'native-base';
import log from '@cap-cross/cap-core';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Background from '../../common/Background';
import PinView from '../../common/PinView';
import { login } from '../../../redux/user/userMiddleware';
import { SecureStore } from 'expo';

const mapStateToProps = (state) => {
  return {
    isAuthentificating: state.user.isAuthentificating,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {return dispatch(login(username, password))},
  };
}


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
);

@enhance
export default class VerificationScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state= {
      mode: this.props.navigation.getParam("pin") === null || this.props.navigation.getParam("pin") === undefined ? 'new' : 'verify'
    };
  }

  componentDidMount = () => {
    if (this.state.mode === 'new') {
      alert("Задайте PIN из четырех цифр");
    }
  }

  onSuccessNew = (pin) => {
    log.trace("Verification successfull... " + this.props.navigation.getParam("username") + " " + this.props.navigation.getParam("password"))
    this.props.login(this.props.navigation.getParam("username"), this.props.navigation.getParam("password"))
    .then((response) => {
      log.trace("Saving pin...");
      SecureStore.setItemAsync("pin", pin);
      log.trace("Authentification completed, redirecting to App...");
      this.props.navigation.navigate('App');
    })
    .catch((error => {
      log.trace("Authentification failed, redirecting to Auth...");
      this.props.navigation.navigate('Auth');
      Toast.show({
        text: error.message,
        type: 'danger',
        buttonText: 'OK',
        duration: 5000
      });
    }));
  }

  onSuccessVerify = () => {
    log.trace("Verification successfull...")
    this.props.login(this.props.navigation.getParam("username"), this.props.navigation.getParam("password"))
    .then((response) => {
      log.trace("Authentification completed, redirecting to App...");
      this.props.navigation.navigate('App');
    })
    .catch((error => {
      log.trace("Authentification failed, redirecting to Auth...");
      this.props.navigation.navigate('Auth');
      Toast.show({
        text: error.message,
        type: 'danger',
        buttonText: 'OK',
        duration: 5000
      });
    }));
  }

  onFailureVerify = () => {
    Toast.show({
      text: "Вы ввели неверный PIN, попробуйте ещё раз",
      type: 'danger',
      buttonText: 'OK',
      duration: 5000
    });
  }

  render() {
    let onSuccess = this.state.mode === 'new' ? this.onSuccessNew : this.onSuccessVerify;
    let pin = this.props.navigation.getParam("pin");
    return (
      <Background>
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: "rgba(17,49,85,0.55)"}}>
            <PinView 
            mode={this.state.mode} 
            onSuccess={onSuccess} 
            onFailure={this.onFailureVerify} 
            targetPin={pin == null ? "" : pin}/>
        </View>
      </Background>
    );
  }
}