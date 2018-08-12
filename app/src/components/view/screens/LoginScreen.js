import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { reduxForm } from 'redux-form';
import log from '@cap-cross/cap-core';

import UserDetail from '../form/UserDetail';
import * as UserActions from '../../../redux/user/userActions';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import LoginForm from '../form/LoginForm';

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

  logout = () => {
    this.props.logout()
      .then((response) => {
        log.trace('UserScreen.logout(): logout Done!' + JSON.stringify(response));
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        log.trace(err.message);
        Toast.show({
          text: err.message,
          type: 'danger',
          buttonText: 'OK',
          duration: 5000
        });
      });
  };

  render() {

    const styles = this.getStyles();

    return (
      <Background>
        <Container>
          <Content contentContainerStyle={styles.content}>
            <LoginForm
              navigation={this.props.navigation}
            />
          </Content>
          <Footer style={{backgroundColor: 'rgba(17,49,85,0.85)', justifyContent: 'center', height: 30}}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>Inspired by JepRia.org</Text>
          </Footer>
        </Container>
      </Background>
    );
  }
}
