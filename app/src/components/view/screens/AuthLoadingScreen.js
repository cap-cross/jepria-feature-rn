import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'native-base';
import { View, ActivityIndicator } from 'react-native';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { reduxForm } from 'redux-form';
import log from '@cap-cross/cap-core';

import Background from '../../common/Background';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../res/style';
import { login } from '../../../redux/user/userMiddleware';
import { getCredentials } from '../../../api/LoginAPI';


const mapDispatchToProps = dispatch => ({
  login: (username, password) => {return dispatch(login(username, password))}
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  pure,
);

@enhance
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getCredentials()
      .then((credentials) => {
        log.trace("Credentials found in storage, processing auto-authentification")
        this.props.login(credentials.username, credentials.password)
          .then((response) => {
            this.props.navigation.navigate("App");
          })
          .catch((error) => {
            log.trace("Error during auto-authentification process redirect to authentification");
            Toast.show({
              text: error.message,
              type: 'danger',
              buttonText: 'OK',
              duration: 5000
            });
            this.props.navigation.navigate("Auth");
          });
      })
      .catch((error) => {
        log.trace("No credentials found in storage, redirecting to authentification")
        this.props.navigation.navigate("Auth");
      });
  }

  render() {
    return (
      <View style={{
        flex: 1, 
        backgroundColor: '#175767',
        justifyContent: 'center', 
        alignItems: 'center',}}>
        <ActivityIndicator size='large' color={LIGHT_AQUA_GREEN_COLOR}/>
      </View>
    );
  }
}
