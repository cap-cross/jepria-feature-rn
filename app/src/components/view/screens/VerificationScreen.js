import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert, Text, Platform } from 'react-native';
import { Toast, Icon } from 'native-base';
import log from '@cap-cross/cap-core';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Background from '../../common/Background';
import PinView from '../../common/PinView';
import { authenticateUser } from '../../../redux/user/userMiddleware';
import { SecureStore, Fingerprint } from 'expo';
import { LoadingPanel } from '../../common/LoadingPanel';

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.user.isAuthenticating,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: () => {return dispatch(authenticateUser())},
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
      targetPin: this.props.navigation.getParam("pin"),
      compatible: false,
      fingerprints: false,
    };
  }
  
  checkDeviceForFingerprintSupport = async () => {
    let compatible = await Fingerprint.hasHardwareAsync();
    let fingerprints = await Fingerprint.isEnrolledAsync();
    this.setState({...this.state, compatible, fingerprints})
  }

  scanFingerprint = async () => {
    log.trace("VerificationScreen: Waiting for PIN or FingerPrint");
    let result = await Fingerprint.authenticateUserAsync();
    log.trace("VerificationScreen: RESULT: " + JSON.stringify(result));
    if (result.success) {
      log.trace("VerificationScreen: FingerPrint accepted, redirecting to App");
      this.setState({...this.state, result: true});
      return;
    } else {
      if (result.error !== "user_cancel" && result.error !== "app_cancel" ) {
        log.trace("VerificationScreen: RESULT ERROR: " + JSON.stringify(result.error));
        Toast.show({
          text: "Ошибка при проверке отпечатка, попробуйте ещё раз или введите PIN",
          type: 'danger',
          buttonText: 'OK',
          duration: 5000
        });
        this.setState({...this.state, result: false});
      }
    }
  }

  componentDidMount = () => {
    this.checkDeviceForFingerprintSupport();
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
  }

  componentDidUpdate = () => {
    log.trace("VerificationScreen: STATE: " + JSON.stringify(this.state));
    if (this.state.result == true) {
      this.onSuccessVerify();
    } else if (this.state.compatible && this.state.fingerprints && this.state.mode !== 'new') {
      this.scanFingerprint();
    }
  }

  onSuccessNew = async (pin) => {
    log.trace("VerificationScreen: Saving pin...");
    try {
      await SecureStore.setItemAsync("pin", pin);      
      Alert.alert(
        'PIN',
        'PIN успешно задан. Введите код еще раз для потдверждения входа.',
        [
          {text: 'OK', onPress: () => {
          }},
        ],
        { cancelable: false }
      );
      this.setState({...this.state, mode: 'verify', compatible: false, fingerprints: false, targetPin: pin});
    } catch (error) {
      log.error(error.message);
    }
  }

  onSuccessVerify = () => {
    log.trace("VerificationScreen: Verification successfull...")
    this.props.authenticateUser()
    .then((response) => {
      log.trace("VerificationScreen: Verification completed, redirecting to App...");
      this.props.navigation.navigate('App');
    })
    .catch((error => {
      log.trace("VerificationScreen: Verification failed, redirecting to Auth...");
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
    let pin = this.state.targetPin;
    let headerText = Platform.OS !== 'ios' && this.state.compatible && this.state.fingerprints && this.state.mode !== 'new' ? (
      <View style={{width: '100%', backgroundColor: 'rgba(17,49,85,0.8)', flexDirection: 'row', padding: 15, alignContent: 'center', alignItems: 'center'}}>
        <Icon type='Ionicons' name='md-finger-print' style={{color: 'white', fontSize: 18, marginHorizontal: 5}}/>
        <Text style={{color: 'white', fontSize: 16}}>
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
            targetPin={pin == null ? "" : pin}
            onFingerPrint={this.scanFingerprint}/>
        </View>
        <LoadingPanel show={this.props.isAuthenticating} text="Входим в приложение..."/>
      </Background>
    );
  }
}