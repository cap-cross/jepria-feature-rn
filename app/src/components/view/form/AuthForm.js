import React from 'react';
import { func, PropTypes } from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Content, Form, View, Toast } from 'native-base';
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
import { LoadingPanel } from '../../common/LoadingPanel';


const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.user.isAuthenticating,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {return dispatch(login(username, password))},
    getUserData: () => dispatch(getUserData())
  };
}


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'authForm' }),
  pure,
);

@enhance
export default class AuthForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
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

  handleSubmit = () => this.props.dispatch(this.props.handleSubmit(this.submitLogin));

  submitLogin = (values) => {
    this.props.login(
      values.username,
      values.password)
      .then((response) => {
        this.props.navigation.navigate('Verify',
        {
          username: values.username,
          password: values.password,
          pin: null,
          hasFingerPrint: false
        });
      })
      .catch((err) => {
        Toast.show({
          text: err.message,
          type: 'danger',
          buttonText: 'OK',
          duration: 5000
        });
      });
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    return (
        <View style={{flex:0}}>
            <View style={{paddingTop: '10%', paddingBottom: 30}}>
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
                  this.handleSubmit();
                }}
              >
                <Text style={styles.buttonText}>ВОЙТИ</Text>
              </TouchableOpacity>
            </Form>
          <LoadingPanel show={this.props.isAuthenticating} text="Входим в приложение..."/>
        </View>
    );
  }
}