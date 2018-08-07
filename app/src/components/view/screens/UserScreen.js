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
import { logout } from '../../../redux/user/userMiddleware';
import { duration } from 'moment';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch),
  logout: () => {return dispatch(logout())}
});


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
);

@enhance
export default class UserScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  getStyles = () => ({
    content: {
      justifyContent: 'space-between',
      padding: 8,
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
    editButton: {
      backgroundColor: 'rgba(231,76,60,1)',
      borderColor: 'rgba(231,76,60,1)',
      borderWidth: 1,
      height: 56,
      width: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 30,
      right: 30,
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
    },
    editButtonIcon: {
      color: 'white',
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
     const { user } = this.props;
    // Получить из state, а в state - по запросу с backend 

    const styles = this.getStyles();

    return (
      <Background>
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button onPress={() => {this.props.navigation.openDrawer()}} transparent>
                <Icon name="menu" style={styles.icon} />
              </Button>
            </Left>
            <Body>
{/*                <Right>
              <Button
                onPress={() => {
                  this.logout();
                }}
                transparent
              >
                <Icon name="exit" style={styles.icon} />
              </Button>
            </Right>  */}          
            <Title style={styles.title}>Профиль</Title>
            </Body>

          </Header>
          <Content contentContainerStyle={styles.content}>
            <UserDetail
              navigation={this.props.navigation}
              user={user}
            />
          </Content>
        </Container>
      </Background>
    );
  }
}
