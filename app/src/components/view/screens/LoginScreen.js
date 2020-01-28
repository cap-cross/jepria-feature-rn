import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';
import AuthForm from '../form/AuthForm';

export default class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  getStyles = () => ({
    content: {
      // justifyContent: 'space-between',
      // padding: 8,
    },
    inputGroup: {
      flex: 0.9,
    },
    header: {
      backgroundColor: DARK_BLUE_COLOR,
    },
    title: {
      color: '#FFFFFF',
    },
    icon: {
      color: '#FFFFFF',
      fontSize: 30,
    },
  });  

  render() {
    const styles = this.getStyles();

    return (
      <Background>
        <KeyboardAwareScrollView enableOnAndroid>
            <AuthForm
              navigation={this.props.navigation}
            />
        </KeyboardAwareScrollView>
        <View style={{backgroundColor: 'rgba(17,49,85,0.85)', justifyContent: 'center', height: 30}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>Inspired by JepRia.org</Text>
        </View>
      </Background>
    );
  }
}
