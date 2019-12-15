import React from 'react';
import {  PropTypes } from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import {  Form, View, Toast } from 'native-base';
import { Field } from 'redux-form';

import TextInput from '../../common/login/TextInput';
import SecureTextInput from '../../common/login/SecureTextInput';
import { reduxForm } from 'redux-form';

import {DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import {required} from '../../../data/validation';
import getStyles from '../../../../res/styles'
import { LoadingPanel } from '../../common/LoadingPanel';
import { SecurityContext } from '../../../context/SecurityContext';

class AuthForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  static contextType = SecurityContext;

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
    this.context.login(
      values.username,
      values.password)
      .then(() => {
        this.props.navigation.navigate('Verify',
        {
          username: values.username,
          password: values.password
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
                onPress={this.handleSubmit}
              >
                <Text style={styles.buttonText}>ВОЙТИ</Text>
              </TouchableOpacity>
            </Form>
          <LoadingPanel show={this.context.isAuthenticating} text="Входим в приложение..."/>
        </View>
    );
  }
}

export default reduxForm({
  form: 'authForm'
})(AuthForm)