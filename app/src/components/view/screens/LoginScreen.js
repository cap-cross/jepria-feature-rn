import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Header, Body, Title, Button, Left, Right, Toast, Footer } from 'native-base';
import { Text } from 'react-native';
import log from '@cap-cross/cap-core';

import UserDetail from '../form/UserDetail';
import * as UserActions from '../../../redux/user/userActions';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import LoginForm from '../form/LoginForm';

import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { reduxForm } from 'redux-form';

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.isAuthentificating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {return dispatch(login(username, password))},
    getUserData: () => dispatch(getUserData()),
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'AuthForm' }),
  pure
);

@enhance
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
  
  
  handleSubmit = () => {
    this.props.handleSubmit(this.submitLogin);
  }
  
  submitLogin = (values) => {
     log.trace(`EditScreen.submitTask(): values = ${JSON.stringify(values)}`);
     // this.props.login(
     //   values.username,
     //   values.password)
     //   .then((response) => {
     //     this.props.navigation.navigate('App');
     //   })
     //   .catch((err) => {
     //     Toast.show({
     //       text: err.message,
     //       type: 'danger',
     //       buttonText: 'OK',
     //       duration: 5000
     //     });
     //   });
   };
 

  render() {
    log.trace("PROPS  " + JSON.stringify(this.props));
    log.trace(this.props.login === undefined);
    log.trace(this.props.handleSubmit === undefined);
    log.trace(this.submitLogin === undefined);
    const styles = this.getStyles();

    return (
      <Background>
        <Container>
          <Content contentContainerStyle={styles.content}>
            <LoginForm
              navigation={this.props.navigation}
              onSubmit={this.handleSubmit}
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
