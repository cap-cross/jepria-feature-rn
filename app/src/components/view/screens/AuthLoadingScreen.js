import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import log from '@cap-cross/cap-core';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../res/style';
import { getCredentials } from '../../../api/JWTLoginAPI';

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
        log.trace("Credentials found, redirecting to verification...");
        this.props.navigation.navigate("Verify", credentials);
      })
      .catch((error) => {
        log.trace("No credentials found, redirecting to authentication...");
        this.props.navigation.navigate("Auth");
      }
    );
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
