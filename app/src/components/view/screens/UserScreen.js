import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import UserDetail from '../form/UserDetail';
import { logout } from '../../../redux/user/userMiddleware';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';

const mapDispatchToProps = dispatch => ({
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
  });

  logout = () => {
    this.props.logout()
      .then((response) => {
        console.log('UserScreen.logout(): logout Done!' + JSON.stringify(response));
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        console.log(err.message);
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
        <Container style={{backgroundColor:'transparent'}}>
          <Header style={styles.header}>
            <Left>
              <Button onPress={this.props.navigation.openDrawer} transparent>
                <Icon name="menu" style={styles.icon} />
              </Button>
            </Left>
            <Body>   
            <Title style={styles.title}>Профиль</Title>
            </Body>
            <Right/>     
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
