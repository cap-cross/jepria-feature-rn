import React from 'react';
import { func, PropTypes } from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Content, Form, View } from 'native-base';
import { Field } from 'redux-form';

import TextInput from '../../common/login/TextInput';
import SecureTextInput from '../../common/login/SecureTextInput';
import loginMediator from '../../../loginMediator';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { reduxForm } from 'redux-form';
import log from '@cap-cross/cap-core';

import {DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import {required} from '../../../data/validation';
import getStyles from '../../../../res/styles'
import { login } from '../../../redux/user/userMiddleware';

export default class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  defaultStyles = {
    button: {
      margin: 30, 
      backgroundColor: DARK_AQUA_GREEN_COLOR,
      borderRadius: 30,
      height: 60,
      justifyContent: 'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
      alignSelf: 'stretch',
    },
    text: {
      color: 'black',
      fontSize: 22,
    },
    footer: {
      backgroundColor: 'rgba(17,49,85,0.85)'
    },
    footerText: {
      color: 'white', 
    },
  }
  customStyles = getStyles('LoginForm');

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
          <Content contentContainerStyle={{ justifyContent: 'center', flex: 1,}}>
            <View style={{paddingBottom: 15}}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={{textAlign: 'center', color: 'white', paddingBottom: 15, fontSize:80}}>J</Text>
                <Text style={{textAlign: 'center', color: 'white', paddingTop: 15, fontSize:80}}>R</Text>
              </View>
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize:60}}>FEATURE</Text>
              </View>
            </View>
            <Form>
              <Field
                name="username"
                component={TextInput}
                // component="input"  type="text"
                placeholder="Username"
                validate = {required}
              />
              <Field
                name="password"
                component={SecureTextInput}
                placeholder="Password"
                validate = {required}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.onSubmit();
                }}
              >
                <Text style={styles.buttonText}>ВОЙТИ</Text>
              </TouchableOpacity>
            </Form>
          </Content>
    );
  }
}
