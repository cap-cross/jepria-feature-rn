import React from 'react';
import PropTypes from 'prop-types';
import { View, Alert, Text, Platform } from 'react-native';
import { Toast } from 'native-base';
import Background from '../../common/Background';
import PinView from '../../common/PinView';
import * as LocalAuthentication from 'expo-local-authentication'
import { Ionicons } from '@expo/vector-icons';
import { LoadingPanel } from '../../common/LoadingPanel';
import { SecurityContext } from '../../../context/SecurityContext';

export default class VerificationScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static contextType = SecurityContext;
  
  constructor(props) {
    super(props);

    this.state= {
       mode: '',
       targetPin: '',
      compatible: false,
      fingerprints: false,
    };
  }
  
  checkDeviceForFingerprintSupport = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({
      mode: this.context.pin ? 'verify' : 'new',
      targetPin: this.context.pin,
      compatible, 
      fingerprints})
  }

  scanFingerprint = async () => {
    console.log("Waiting for PIN or FingerPrint");
    let result = await LocalAuthentication.authenticateAsync();
    console.log("RESULT: " + JSON.stringify(result));
    if (result.success) {
      console.log("FingerPrint accepted, redirecting to App");
      this.setState({...this.state, result: true});
      return;
    } else {
      if (result.error !== "user_cancel" && result.error !== "app_cancel" ) {
        console.log("RESULT ERROR: " + JSON.stringify(result.error));
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

  componentWillUnmount = () => {
    LocalAuthentication.cancelAuthenticate();
  }

  componentDidUpdate = () => {
    if (this.state.result == true) {
      this.onSuccessVerify();
    } else if (this.state.compatible && this.state.fingerprints && this.state.mode !== 'new') {
      this.scanFingerprint();
    }
  }

  onSuccessNew = async (pin) => {
    console.log("Saving pin...");
    try {
      await this.context.savePin(pin);      
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
      console.log(error.message);
    }
  }

  onSuccessVerify = () => {
    console.log("Verification successfull...");
    this.props.navigation.navigate('App');
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
      <View style={{height: 80, width: '100%', backgroundColor: 'rgba(17,49,85,0.8)', flexDirection: 'row', padding: 15, alignItems: 'flex-end'}}>
        <Ionicons  name='md-finger-print' size={18} style={{color: 'white', marginHorizontal: 5}}/>
        <Text style={{color: 'white', fontSize: 16}}>
          Приложите палец к сканеру отпечатков
        </Text>
      </View>
    ) :
    (
      <View style={{height: 80, width: '100%', backgroundColor: 'rgba(17,49,85,0.8)', padding: 15, justifyContent: 'flex-end'}}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
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
        <LoadingPanel show={this.context.isAuthenticating} text="Входим в приложение..."/>
      </Background>
    );
  }
}