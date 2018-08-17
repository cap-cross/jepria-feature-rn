import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert, Text } from 'react-native';
import { Toast, Icon } from 'native-base';
import log from '@cap-cross/cap-core';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Background from '../../common/Background';
import PinView from '../../common/PinView';
import { login } from '../../../redux/user/userMiddleware';
import { SecureStore, Fingerprint } from 'expo';

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
      mode: this.props.navigation.getParam("pin") === null || this.props.navigation.getParam("pin") === undefined ? 'new' : 'verify',
      fingerPrint:'skip'
      // fingerPrint: !this.checkDeviceForHardware() && !this.checkForFingerprints() && !this.props.navigation.getParam("hasFingerPrint") === 'refused' ? 
      //   (this.props.navigation.getParam("hasFingerPrint") === "true" ? "verify" : "create") : "skip"
    };
  }

  checkDeviceForHardware = async () => {
    return await Expo.Fingerprint.hasHardwareAsync();
  }
  
  checkForFingerprints = async () => {
    return await Expo.Fingerprint.isEnrolledAsync();
  }
  
  scanFingerprint = async () => {
    log.trace("Waiting for PIN or FingerPrint");
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    if (result) {
      log.trace("FingerPrint accepted, redirecting to App");
      SecureStore.setItemAsync("hasFingerPrint", 'true');
      this.props.navigation.navigate('App');
    }
  }

  componentDidMount = () => {
    if (this.state.mode === 'new') {
      Alert.alert(
        'PIN',
        'Задайте PIN из четырех цифр',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
    if (this.state.fingerPrint === "verify") {
      this.scanFingerprint();
    }
  }

  componentDidUpdate = () => {
    if (this.state.fingerPrint === "verify") {
      this.scanFingerprint();
    }
  }

  createFingerPrint = () => {
    if (this.state.mode === 'new') {
      Alert.alert(
        'Отпечаток пальца',
        'Хотите разрешить вход с помощью отпечатка пальца?',
        [
          {text: 'Нет', onPress: () => {
            SecureStore.setItemAsync("hasFingerPrint", 'refused');
            this.props.navigation.navigate('App');
          }},
          {text: 'Да', onPress: () => {
            this.setState({...this.state, fingerPrint: "verify"});
          }},
        ],
        { cancelable: false }
      );
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
    let headerText = this.state.fingerPrint !== "skip" && this.state.fingerPrint !== "create" ? (
      <View style={{width: '100%', backgroundColor: 'rgba(17,49,85,0.8)', flexDirection: 'row', padding: 15, alignContent: 'center', alignItems: 'center'}}>
        <Icon type='Ionicons' name='md-finger-print' style={{color: 'white', fontSize: 20, marginHorizontal: 5}}/>
        <Text style={{color: 'white', fontSize: 18}}>
          Приложите палец к сканеру отпечатков
        </Text>
      </View>
    ) :
    (
      <View style={{width: '100%', backgroundColor: 'rgba(17,49,85,0.8)', flexDirection: 'row', padding: 15, alignContent: 'center'}}>
        <Text style={{flex: 1, color: 'white', fontSize: 18, textAlign: 'center'}}>
          Введите PIN
        </Text>
      </View>
    )
    return (
      <Background>
       { headerText }
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